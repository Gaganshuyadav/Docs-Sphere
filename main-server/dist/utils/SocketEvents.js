var SocketEvent;
(function (SocketEvent) {
    SocketEvent["SEND_DOCUMENT_CHANGES"] = "SEND_DOCUMENT_CHANGES";
    SocketEvent["RECEIVE_DOCUMENT_CHANGES"] = "RECEIVE_DOCUMENT_CHANGES";
    SocketEvent["CURRENT_USERS"] = "CURRENT_USERS";
    SocketEvent["USER_DISCONNECT_FROM_CURRENT_USERS"] = "USER_DISCONNECT_FROM_CURRENT_USERS";
    SocketEvent["UPDATE_TITLE"] = "UPDATE_TITLE";
})(SocketEvent || (SocketEvent = {}));
export { SocketEvent };
