import { client } from "../config/db";


const bannerImage = client
  .db("loweCommerce")
  .collection("banners");


export const bannerService = async(payload:any)=>{

    const result = await bannerImage.insertOne(payload);
    return result;
}


export const getBannersService = async()=>{
    const result = await bannerImage.findOne({}, { sort: { $natural: -1 } });
    return result;
}