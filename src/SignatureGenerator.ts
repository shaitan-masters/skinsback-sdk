import md5 from "md5";
import { createHmac } from "crypto";
import { Params } from "./types";

export const SignatureApiBuilder = (params: Params, secret_key: string) => {
  let paramsString = "";

  for (const [key, value] of Object.entries(params).sort()) {
    if (key === "sign") {
      continue;
    }

    if (typeof value === "object") {
      continue;
    }

    paramsString += key + ":" + value + ";";
  }

  return createHmac("sha1", secret_key).update(paramsString).digest("hex");
};

export const SignatureWebSocketsBuilder = (
  shop_id: string | number,
  secret_key: string
) => {
  return md5(shop_id + secret_key);
};
