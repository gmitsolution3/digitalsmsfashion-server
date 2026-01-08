import { Request, Response } from "express";
import { bannerService, getBannersService } from "../services/banner.service";

export const postBannerController = async (req: Request, res: Response) => {
  const data = req.body;

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No data provided" });
  }

  try {
    const result = await bannerService(data);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to add banner" });
    }

    return res
      .status(201)
      .json({
        success: true,
        message: "Banner added successfully",
        data: result,
      });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: err.message, data: err });
  }
};


export const getBanners = async (req: Request, res: Response) => {
     // Implementation for fetching banners will go here

    const result = await getBannersService();

    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch banners" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Banners fetched successfully",
        data: result,
      });
}
