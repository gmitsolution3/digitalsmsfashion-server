import { Router } from "express";
import {
  getBanners,
  postBannerController,
} from "../controllers/banner.controller";

const router = Router();

router.post("/", postBannerController);
router.get("/", getBanners);

export default router;
