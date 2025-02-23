import catchAsyncErrors from "../../middleware/catch-async.js";
import { validationResult } from "express-validator";
import { User } from "../../models/user.model.js";
import { DocumentUser } from "../../models/document-user.model.js";
import { Document } from "../../models/document.model.js";
import { mailService } from "../../services/mail.service.js";
import { env } from "../../config/env.config.js";
class ShareController {
    constructor() {
        this.createSharedDocument = catchAsyncErrors(async (req, res, next) => {
            const err = validationResult(req);
            if (!err.isEmpty()) {
                return res.status(400).json(err);
            }
            if (!req.user) {
                return res.sendStatus(400);
            }
            //if document id is not a number than give error;
            if (!Number(req.params.id)) {
                return res.sendStatus(404);
            }
            const { id } = req.params;
            const { email, permission } = req.body;
            const sharedUser = await User.findOne({
                where: {
                    email,
                }
            });
            if (!sharedUser) {
                return res.sendStatus(404);
            }
            //firstly check if user exixt in the SharedUsers or not
            const findSharedUser = await DocumentUser.findOne({
                where: {
                    documentId: id,
                    userId: sharedUser.id,
                }
            });
            if (findSharedUser) {
                return res.sendStatus(409);
            }
            //create shared document in DocumentUser model
            const documentUser = await DocumentUser.create({
                documentId: id,
                userId: sharedUser.id,
                permission
            });
            //make mail for sending
            const mail = {
                from: env.PASSWORD_EMAIL,
                to: sharedUser.email,
                subject: `${req.user.email} shared a document with you!`,
                text: `Click the following link to view and edit the document: ${env.VITE_SERVER}/document/${id}`,
            };
            //call mailservice to send the email
            await mailService.sendMail(mail);
            return res.status(200).json({ documentUser, user: { email: sharedUser.email } });
        });
        this.deleteSharedDocument = catchAsyncErrors(async (req, res, next) => {
            if (!req.user) {
                return res.sendStatus(400);
            }
            //if document id is not a number than give error;
            if (!Number(req.params.documentId)) {
                return res.sendStatus(400);
            }
            const { documentId, userId } = req.params;
            //check if document exist or not ---------------
            const document = await Document.findOne({
                where: {
                    id: documentId,
                    userId: req.user.id,
                }
            });
            if (!document) {
                return res.sendStatus(400);
            }
            //check if shared document exist or not ---------------
            const documentUser = await DocumentUser.findOne({
                where: {
                    documentId,
                    userId
                }
            });
            if (!documentUser) {
                return res.sendStatus(400);
            }
            //delete shared document in DocumentUser model ----
            await DocumentUser.destroy({
                where: {
                    documentId,
                    userId
                }
            });
            res.sendStatus(200);
        });
    }
}
const shareController = new ShareController();
export { shareController };
