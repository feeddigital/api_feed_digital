import "dotenv/config";

export default {
  PORT: process.env.PORT || 8080,
  MONGO_LOCAL_URL: process.env.MONGO_LOCAL_URL || '',
  MONGO_ATLAS_URL_TEST: process.env.MONGO_ATLAS_URL_TEST || '',
  MONGO_ATLAS_URL_PROD: process.env.MONGO_ATLAS_ATLAS_URL_PROD || '',
  ENV: process.env.ENV || 'dev',
  SECRET_KEY: process.env.SECRET_KEY || '',

};
