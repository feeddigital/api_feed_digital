import config from "./config";
import { connect } from "mongoose";
import MongoStore from "connect-mongo";

export const dbConnection = async (): Promise<void> => {
  // if (process.env.ENV === "dev") {
  //   await connect(process.env.MONGO_ATLAS_URL_TEST as string);
  // }
  // if (process.env.ENV === "prod") {
  //   await connect(process.env.MONGO_ATLAS_URL_PROD as string);
  // }

  // if (process.env.ENV === "local") {
    await connect(config.MONGO_URL as string);
  // }

  console.log(`ENVIRONMENT DB => ${config.ENV}`);
};

export const storeConfig = {
  store: MongoStore.create({
    mongoUrl:
      config.MONGO_URL ||
      "",
    crypto: { secret: config.SECRET_KEY || "" },
    ttl: 180,
  }),
  secret: config.SECRET_KEY || "",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 },
};
