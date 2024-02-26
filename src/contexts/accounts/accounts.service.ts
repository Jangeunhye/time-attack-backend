import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { isEmail } from "validator";
import { JWT_SECRET_KEY } from "../../config/env.config";
import prismaClient from "../../prisma/client.prisma";
import { LogInDto, SignUpDto } from "./accounts.type";

const signUp = async (signUpDto: SignUpDto) => {
  const id = nanoid();
  const { email, password } = signUpDto;

  if (!email.trim()) throw new Error("No email");
  if (!isEmail(email)) throw new Error("Invalid email");
  if (!password.trim()) throw new Error("No Password");
  if (password.length < 8) throw new Error("To short password");

  const encryptedPassword = await hash(password, 12);
  const user = await prismaClient.user.create({
    data: { id, email, encryptedPassword },
  });
  const accessToken = generateAccessToken(user);
  return accessToken;
};

const logIn = async (logInDto: LogInDto) => {
  const { email, password } = logInDto;
  const user = await prismaClient.user.findUnique({
    where: { email },
  });
  if (!user) throw new Error("No User");

  const isCorrectPassword = await compare(password, user.encryptedPassword);
  if (!isCorrectPassword) throw new Error("Invalid Password");

  const accessToken = generateAccessToken(user);
  return accessToken;
};

const generateAccessToken = (user: User) => {
  const { email } = user;
  const accessToken = jwt.sign({ email }, JWT_SECRET_KEY, {
    subject: user.id,
    expiresIn: "2h",
  });
  return accessToken;
};

const accountsService = {
  signUp,
  logIn,
};
export default accountsService;
