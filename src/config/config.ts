import dotenv from "dotenv";

// const ENV = process.argv.slice(2)[0];
const ENV = process.env.ENV

console.log(ENV);

// dotenv.config({ path: ENV === "prod" ? "./.env.prod" : "./.env.dev" });
dotenv.config()

export default {
  PORT: process.env.PORT || 8080,
  MONGO_URL: process.env.MONGO_URL || "",
  ENV: ENV || "dev",
  SECRET_KEY: process.env.SECRET_KEY || "",
  EMAIL: process.env.EMAIL || "",
  PASSWORD: process.env.PASSWORD || "",
  CLIENT_ID_GOOGLE: process.env.CLIENT_ID_GOOGLE || "",
  CLIENT_SECRET_GOOGLE: process.env.CLIENT_SECRET_GOOGLE || "",
  CALLBACK_URL_GOOGLE: process.env.CALLBACK_URL_GOOGLE || "",
  ACCESS_TOKEN_MP: process.env.ACCESS_TOKEN_MP || "",
};
