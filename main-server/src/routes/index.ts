import { NextFunction, Router, Request, Response} from "express";
import user from "./user.route.js";
import auth from "./auth.route.js";
import document from "./document.route.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { UserRoleEnum } from "../utils/types/enum/role-enum.js";
const router = Router();


router.get("/", authenticate, authorize([UserRoleEnum.SUPERADMIN]), async( req:Request, res:Response, next:NextFunction):Promise<void>=>{


    res.status(200).json({
        success:true
    })
    return;

} );

router.use("/user", user);
router.use("/auth", auth);
router.use("/document", document);


export default router;


