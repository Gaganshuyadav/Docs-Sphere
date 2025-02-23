import app from "./server.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { SocketEvent } from "./utils/SocketEvents.js";
import { userService } from "./services/user.service.js";
import jwt from "jsonwebtoken";
import { env } from "./config/env.config.js";
import { documentService } from "./services/document.service.js";
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});
//set app with io for emit
app.set("io", io);
const userEmails = new Map();
io.on("connection", (socket) => {
    const documentId = socket.handshake.query.documentId;
    const token = socket.handshake.query.accessToken;
    //add user and documentId in socket--------------
    if (!token || !documentId) {
        socket.disconnect();
    }
    else {
        //authenticate user--------------
        userService.getIsTokenActive(token)
            .then((isTokenActive) => {
            if (!isTokenActive) {
                socket.disconnect();
            }
            else {
                jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        socket.disconnect();
                    }
                    else {
                        const { id, email, roles } = decoded;
                        socket.user = { id, email, roles };
                        //document id check -------------
                        //if document id is not a number than give error;
                        if (!Number(documentId)) {
                            socket.disconnect();
                        }
                        else {
                            documentService.findDocumentById(Number(documentId), id)
                                .then((document) => {
                                if (document === null) {
                                    return socket.disconnect();
                                }
                                else {
                                    socket.join(documentId);
                                }
                            })
                                .catch(() => {
                                socket.disconnect();
                            });
                        }
                    }
                });
            }
        });
        //socket event listeners 
        socket.on(SocketEvent.SEND_DOCUMENT_CHANGES, (data) => {
            socket.broadcast.to(documentId).emit(SocketEvent.RECEIVE_DOCUMENT_CHANGES, { content: data.content, user: socket?.user });
        });
    }
    //current User Join
    socket.on(SocketEvent.CURRENT_USERS, (data) => {
        if (!data.user || !data.documentId) {
            return;
        }
        const emails = userEmails.get(data.documentId) || [];
        if (!emails.includes(data.user.email)) {
            emails.push(data.user.email); //push method give length which is a number
            userEmails.set(data.documentId, emails);
        }
        const currentUsers = userEmails.get(data.documentId);
        io.to(data.documentId).emit(SocketEvent.CURRENT_USERS, { currentUsers });
    });
    //current User Leave
    socket.on(SocketEvent.USER_DISCONNECT_FROM_CURRENT_USERS, (data) => {
        if (!data.user || !data.documentId) {
            return;
        }
        const emails = userEmails.get(data.documentId) || [];
        if (emails.includes(data.user.email)) {
            let filteredEmails = emails.filter((email) => email != data.user.email);
            //if documentId value array is empty, then delete it is empty 
            if (filteredEmails.length < 1) {
                userEmails.delete(data.documentId);
            }
            else {
                userEmails.set(data.documentId, filteredEmails);
            }
            userEmails.set(data.documentId, filteredEmails);
        }
        const currentUsers = userEmails.get(data.documentId);
        io.to(data.documentId).emit(SocketEvent.CURRENT_USERS, { currentUsers });
    });
    //Users disconnect
    socket.on("disconnecting", (data) => {
        const documentId = socket.handshake.query.documentId;
        const user = socket.user;
        if (!documentId || !user) {
            return;
        }
        const emails = userEmails.get(documentId) || [];
        if (emails.includes(user.email)) {
            let filteredEmails = emails.filter((email) => email != user.email);
            //if documentId value array is empty, then delete it is empty 
            if (filteredEmails.length < 1) {
                userEmails.delete(documentId);
            }
            else {
                userEmails.set(documentId, filteredEmails);
            }
        }
        const currentUsers = userEmails.get(documentId);
        io.to(documentId).emit(SocketEvent.CURRENT_USERS, { currentUsers });
    });
    //Users disconnecting
    socket.on("disconnect", (data) => {
    });
});
//server is running...
server.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
///sockets:-
/*
io.emit() :- send to all
socket.broadcast.emit() :- send to all except sender

socket.join(roomId) :- join socket to specific room
socket.to(roodId) :- send to all in room without sender
socket.in(roomId) :- send to all in room with sender

socket.emit :- send itself
scoket.to(socketId) :- sepcific user
socket.broadcast.to(socketId):- specific user

io.of("/namespace") :- send to all connedted by namespace

*/
