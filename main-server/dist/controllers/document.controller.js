import catchAsyncErrors from "../middleware/catch-async.js";
import { documentService } from "../services/document.service.js";
import { validationResult } from "express-validator";
import { Document } from "../models/document.model.js";
import { SocketEvent } from "../utils/SocketEvents.js";
class DocumentController {
    constructor() {
        this.getOne = catchAsyncErrors(async (req, res, next) => {
            if (!req.user) {
                return res.sendStatus(403);
            }
            //if document id is not a number than give error;
            if (!Number(req.params.id)) {
                return res.sendStatus(404);
            }
            const docId = req.params.id;
            const userId = req.user.id;
            //find document in Document and DocumentUser Model
            let findDoc = await documentService.findDocumentById(Number(docId), userId);
            if (findDoc === null) {
                return res.sendStatus(404);
            }
            res.status(200).json({
                success: true,
                document: findDoc
            });
        });
        this.getAll = catchAsyncErrors(async (req, res, next) => {
            if (!req.user) {
                return res.sendStatus(403);
            }
            const findAllDocs = await documentService.findAllDocuments(parseInt(req.user.id));
            if (findAllDocs == null) {
                return res.sendStatus(404);
            }
            res.status(200).json({
                success: true,
                documents: findAllDocs
            });
        });
        this.updateDocument = catchAsyncErrors(async (req, res, next) => {
            if (!req.user) {
                return res.sendStatus(403);
            }
            //if document id is not a number than give error;
            if (!Number(req.params.id)) {
                return res.sendStatus(404);
            }
            const err = validationResult(req);
            if (!err.isEmpty()) {
                return res.status(404).json(err);
            }
            const userId = req.user.id;
            const docId = req.params.id;
            const { title, content, isPublic } = req.body;
            //find document in Document and DocumentUser Model
            const findDoc = await documentService.findDocumentById(Number(docId), userId);
            if (!findDoc) {
                return res.sendStatus(404);
            }
            //update title
            if (title != undefined && title != null) {
                findDoc.title = title;
            }
            //update content
            if (content != undefined && content != null) {
                findDoc.content = content;
            }
            //update isPublic
            if (isPublic != undefined && isPublic != null) {
                findDoc.isPublic = isPublic;
            }
            //update the document
            await findDoc.save();
            //send realtime message for updated values
            const io = req.app.settings.io;
            // Socket---------------------
            io.to(docId).emit(SocketEvent.UPDATE_TITLE, { title });
            return res.sendStatus(200);
        });
        this.createDocument = catchAsyncErrors(async (req, res, next) => {
            if (!req.user) {
                return res.sendStatus(403);
            }
            const { title, content, isPublic } = req.body;
            const userId = req.user.id;
            const document = await Document.create({
                title,
                content,
                isPublic,
                userId
            });
            res.status(200).json({
                success: true,
                document
            });
        });
        this.deleteDocument = catchAsyncErrors(async (req, res, next) => {
            if (!req.user) {
                return res.sendStatus(403);
            }
            //if document id is not a number than give error;
            if (!Number(req.params.id)) {
                return res.sendStatus(404);
            }
            const documentId = req.params.id;
            try {
                await Document.destroy({
                    where: {
                        id: documentId,
                        userId: req.user.id
                    }
                });
                return res.sendStatus(200);
            }
            catch (err) {
                return res.sendStatus(403);
            }
        });
        this.searchDocuments = catchAsyncErrors(async (req, res, next) => {
            if (!req.user?.id) {
                return;
            }
            const { search = "" } = req.body;
            const allFinedDocuments = await documentService.searchAllDocuments(req.user?.id, search);
            return res.status(200).json({
                success: true,
                allDocs: allFinedDocuments,
            });
        });
    }
}
const documentController = new DocumentController();
export { documentController };
