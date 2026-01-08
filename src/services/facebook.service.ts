import { client } from "../config/db";
import { decrypt } from "../utils/encryption";

const facebookCredential = client
  .db("loweCommerce")
  .collection("facebook_credentials");

export const saveFacebookCredentialsService = async (credential: any) => {
  const result = await facebookCredential.insertOne(credential);
  return result;
};


export const getFacebookCredentialsService = async () => {
  const result = await facebookCredential.findOne({}, { sort: { $natural: -1 } });

    if (!result) {
      return null;
    }

  const decryptedToken = decrypt(result.fbCapiToken);


  return {
    fbPixelId: result.fbPixelId,
    isEnabled: result.isEnabled,
    fbCapiTokenMasked: decryptedToken ? "••••••••••••••••" : null,
    _internal: {
      fbCapiToken: decryptedToken,
    },
  };

  
}
