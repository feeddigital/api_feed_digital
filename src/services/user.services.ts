import { User } from "../types/User";
import { UserModel } from "../models/user.model";
import { createHash } from "../utils/bcrypt";
import { createTransport } from "nodemailer";
import "dotenv/config";

const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const register = async (user: User): Promise<User | null> => {
  try {
    const { email, firstname } = user;
    const newUser = await UserModel.create({
      ...user,
      password: createHash(user?.password),
    });
    const gmailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Bienvenida/o a Feed Digital | Cursos de programación",
      html: `<h1>Hola ${firstname}, ¡Te damos la Bienvenida a Feed Digital!</h1>`,
    };
    await transporter.sendMail(gmailOptions);
    return newUser;
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const getAll = async (): Promise<User[] | []> => {
  try {
    return await UserModel.find({});
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const getById = async (id: string): Promise<User | null> => {
  try {
    return await UserModel.findById(id);
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const getByEmail = async (email: string): Promise<User | null> => {
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export const update = async (id: string, body: User): Promise<User | null> => {
  try {
    return await UserModel.findByIdAndUpdate(id, body, { new: true });
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const remove = async (id: string): Promise<User | null> => {
  try {
    return await UserModel.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};
