import config from "./config";
import { connect } from "mongoose";
import MongoStore from "connect-mongo";
import "dotenv/config";

export const dbConnection = async (): Promise<void> => {
  if (process.env.ENV === "dev") {
    await connect(process.env.MONGO_ATLAS_URL_TEST as string);
  }
  if (process.env.ENV === "prod") {
    await connect(process.env.MONGO_ATLAS_URL_PROD as string);
  }

  if (process.env.ENV === "local") {
    await connect(process.env.MONGO_LOCAL_URL as string);
  }

  console.log(`ENVIRONMENT DB => ${config.ENV}`);
};

export const storeConfig = {
  store: MongoStore.create({
    mongoUrl:
      process.env.MONGO_ATLAS_URL_PROD ||
      "",
    crypto: { secret: process.env.SECRET_KEY || "" },
    ttl: 180,
  }),
  secret: process.env.SECRET_KEY || "",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 },
};
