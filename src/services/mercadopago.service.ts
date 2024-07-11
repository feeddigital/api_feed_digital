import { MercadoPagoConfig, Preference } from "mercadopago";
import config from "../config/config";

const client = new MercadoPagoConfig({ accessToken: config.ACCESS_TOKEN_MP });

export const preference = new Preference(client);
