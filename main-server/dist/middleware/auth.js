import jwt from "jsonwebtoken";
import { userService } from "../services/user.service.js";
import { env } from "../config/env.config.js";
import { UserRole } from "../models/user-role.model.js";
import { Role } from "../models/role.model.js";
import catchAsyncErrors from "./catch-async.js";
const authenticate = catchAsyncErrors(async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.sendStatus(401);
    }
    //check if token is in db
    userService.getIsTokenActive(token)
        .then((isTokenActive) => {
        if (!isTokenActive) {
            res.sendStatus(401);
            return;
        }
        //verify with jwt and get the user info
        jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.sendStatus(403);
                return;
            }
            try {
                const { id, email, roles } = decoded;
                req.user = { id, email, roles };
                next();
            }
            catch (err) {
                res.sendStatus(401);
                return;
            }
        });
    })
        .catch((err) => {
        res.sendStatus(401);
    });
});
const authorize = (permittedRoles) => {
    return async (req, res, next) => {
        if (!req.user) {
            res.sendStatus(403);
            return;
        }
        try {
            const userRoles = await UserRole.findAll({ where: { userId: req.user.id }, include: Role });
            const allRoles = userRoles.map((userRole) => {
                return userRole.role.name; //
            });
            if (permittedRoles.some((permittedRole) => allRoles.includes(permittedRole))) {
                next();
            }
            else {
                res.sendStatus(403);
                return;
            }
        }
        catch (err) {
            res.sendStatus(403);
            return;
        }
    };
};
export { authenticate, authorize };
