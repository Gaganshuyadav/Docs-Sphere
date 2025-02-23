import { Router} from "express";
import { authenticate } from "../middleware/auth.js";
import { documentController } from "../controllers/document.controller.js";
import { documentValidator } from "../validators/document.validator.js";
import shareValidator from "../validators/share.validator.js";
import { shareController} from "../controllers/share/share.controller.js";
const router = Router();



// documents routes
router.get("/:id", authenticate, documentController.getOne);

router.get("/", authenticate, documentController.getAll);

router.put("/:id", authenticate, documentValidator.updateDocument, documentController.updateDocument);

router.post("/", authenticate, documentController.createDocument);

router.delete("/:id", authenticate, documentController.deleteDocument);

//search
router.post("/search", authenticate, documentController.searchDocuments);




// share documents routes
router.post("/:id/share", authenticate, shareValidator.createSharedDocument, shareController.createSharedDocument);

router.delete("/:documentId/share/:userId", authenticate, shareController.deleteSharedDocument);


export default router;



