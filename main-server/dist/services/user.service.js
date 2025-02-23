import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import { RefreshToken } from "../models/refresh-token.model.js";
import { mailService } from "./mail.service.js";
class UserService {
    constructor() {
        this.findUserByEmail = async (email) => {
            const user = await User.findOne({ where: { email } });
            return user;
        };
        this.createUser = async (email, password) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const verificationToken = await jwt.sign({ email }, env.JWT_SECRET);
            const user = await User.create({
                email,
                password: hashedPassword,
                verificationToken
            });
            //call method to send verification email
            await this.sendVerificationEmail(user);
            return user;
        };
        this.sendVerificationEmail = async (user) => {
            const mail = {
                from: env.PASSWORD_EMAIL,
                to: user.email,
                subject: "Welcome to Google Docs",
                text: `click the following link to verify your email : ${env.VITE_SERVER}/user/verify-email/${user.verificationToken}`
            };
            await mailService.sendMail(mail);
        };
        this.findUserByVerificationTokenAndEmail = async (verificationToken, email) => {
            const user = await User.findOne({ where: {
                    verificationToken,
                    email
                } });
            return user;
        };
        this.updateIsVerified = async (user, isVerified) => {
            await User.update({ isVerified }, { where: { id: user.id } });
        };
        this.checkPassword = async (password, user) => {
            const checkResult = await bcrypt.compare(password, user.password);
            return checkResult;
        };
        this.generateRequestUser = async (user) => {
            if (user instanceof User) {
                const userWithRoles = await User.scope("withRoles").findByPk(user.id);
                const roles = userWithRoles?.userRoles?.map((userRole) => {
                    return userRole.role.name;
                });
                return { id: user.id, email: user.email, roles };
            }
            else {
                return user;
            }
        };
        this.generateAuthResponse = async (user) => {
            const requestUser = await this.generateRequestUser(user);
            const accessToken = jwt.sign(requestUser, env.JWT_SECRET, { expiresIn: "24h" });
            const refreshToken = jwt.sign(requestUser, env.JWT_SECRET, { expiresIn: "24h" });
            await RefreshToken.destroy({
                where: { userId: requestUser.id }
            });
            await RefreshToken.create({ token: refreshToken, userId: requestUser.id });
            return { accessToken, refreshToken };
        };
        this.getIsTokenActive = async (token) => {
            const refreshToken = await RefreshToken.findOne({ where: { token } });
            return refreshToken !== null;
        };
        this.userLogout = async (userId) => {
            //it deletes user token using userid
            await RefreshToken.destroy({ where: { id: userId } });
        };
        this.findUserById = async (userId) => {
            const user = await User.findByPk(userId);
            return user;
        };
        this.passwordReset = async (user) => {
            const passwordResetToken = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: "24h" });
            await User.update({ passwordResetToken }, { where: { id: user.id } });
            //call method to send reset password email
            await this.passwordResetEmail({ ...user, passwordResetToken });
        };
        this.passwordResetEmail = async (user) => {
            const mail = {
                from: env.PASSWORD_EMAIL,
                to: user.dataValues.email,
                subject: "Reset your password",
                text: `${env.VITE_SERVER}/user/refresh-token/${user.passwordResetToken}`
            };
            await mailService.sendMail(mail);
        };
        this.findUserByResetPassowordToken = async (email, passwordResetToken) => {
            const user = await User.findOne({ where: { email, passwordResetToken } });
            return user;
        };
        this.updatePassword = async (user, password) => {
            //hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await User.update({ password: hashedPassword }, { where: { id: user.id, email: user.email } });
        };
    }
}
const userService = new UserService();
export { userService };
