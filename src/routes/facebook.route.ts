import { Router } from "express";
import { getFacebookCredentials, saveFacebookCredentials } from "../controllers/facebook.controller";

const router = Router();

router.post("/credentials", saveFacebookCredentials);
router.get("/credentials", getFacebookCredentials);

export default router;