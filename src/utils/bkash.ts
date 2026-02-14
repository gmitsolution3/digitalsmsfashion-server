import axios from "axios";

let bkashToken: string | null = null;
let tokenExpiresAt: number | null = null;

export const getBkashToken = async () => {
  if (bkashToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return bkashToken;
  }

  const res = await axios.post(
    process.env.BKASH_GRANT_TOKEN_URL!,
    {
      app_key: process.env.BKASH_API_KEY,
      app_secret: process.env.BKASH_SECRET_KEY,
    },
    {
      headers: {
        username: process.env.BKASH_USERNAME!,
        password: process.env.BKASH_PASSWORD!,
      },
    },
  );

  bkashToken = res.data.id_token;
  tokenExpiresAt = Date.now() + res.data.expires_in * 1000;

  return bkashToken;
};
