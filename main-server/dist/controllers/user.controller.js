import catchAsyncErrors from "../middleware/catch-async.js";
import { validationResult } from "express-validator";
import { userService } from "../services/user.service.js";
import { resetPassword } from "../responses/index.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
class UserCotroller {
    constructor() {
        this.register = catchAsyncErrors(async (req, res, next) => {
            const err = validationResult(req);
            if (!err.isEmpty()) {
                return res.status(400).json(err);
            }
            const { email, password1 } = req.body;
            //send email as well
            const user = await userService.createUser(email, password1);
            res.status(200).json({
                message: "success",
                user
            });
        });
        this.verifyEmail = catchAsyncErrors(async (req, res) => {
            const verificationToken = req.params.token;
            jwt.verify(verificationToken, env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                }
                //use email from verification token
                const { email } = decoded;
                userService.findUserByVerificationTokenAndEmail(verificationToken, email)
                    .then((user) => {
                    if (!user) {
                        return res.sendStatus(400);
                    }
                    try {
                        userService.updateIsVerified(user, true)
                            .then(() => {
                            res.sendStatus(200);
                        })
                            .catch(() => {
                            return res.sendStatus(500);
                        });
                    }
                    catch (err) {
                        return res.sendStatus(403);
                    }
                })
                    .catch(() => {
                    return res.sendStatus(500);
                });
            });
        });
        this.getUser = catchAsyncErrors(async (req, res, next) => {
            const userId = req.params.id;
            const userDetails = await userService.findUserById(userId);
            if (userDetails == null) {
                return res.sendStatus(400);
            }
            return res.status(200).json({
                success: true,
                userDetails
            });
        });
        this.resetPassword = catchAsyncErrors(async (req, res, next) => {
            const err = validationResult(req);
            if (!err.isEmpty()) {
                return res.sendStatus(400);
            }
            const { email } = req.body;
            const user = await userService.findUserByEmail(email);
            if (!user) {
                return res.status(404).json(resetPassword);
            }
            //send email as well
            await userService.passwordReset(user);
            res.status(200).json({ resetPassword });
        });
        this.confirmResetPassword = catchAsyncErrors(async (req, res, next) => {
            const err = validationResult(req);
            if (!err.isEmpty()) {
                return res.status(400).json(err);
            }
            const resetPasswordToken = req.params.token;
            const { password1, password2 } = req.body;
            jwt.verify(resetPasswordToken, env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                }
                try {
                    const { id, email } = decoded;
                    //find user by reset password token 
                    const user = await userService.findUserByResetPassowordToken(email, resetPasswordToken);
                    if (!user) {
                        return res.sendStatus(400);
                    }
                    //update password in db 
                    userService.updatePassword(user, password1).then(() => {
                        res.sendStatus(200);
                    })
                        .catch(() => {
                        res.sendStatus(500);
                    });
                }
                catch (err) {
                    res.sendStatus(500);
                }
            });
        });
    }
}
const userCotroller = new UserCotroller();
export { userCotroller };
