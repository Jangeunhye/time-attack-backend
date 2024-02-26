import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { isEmail } from "validator";
import { JWT_SECRET_KEY } from "../../config/env.config";
import prismaClient from "../../prisma/client.prisma";
import { LogInData, SignUpData, UpdateProfileData } from "./accounts.type";

const signUp = async (data: SignUpData) => {
  const id = nanoid();
  const { email, password, nickname, selfIntroduction } = data;

  if (!email.trim()) throw new Error("No email");
  if (!isEmail(email)) throw new Error("Invalid email");
  if (!password.trim()) throw new Error("No Password");
  if (password.length < 8) throw new Error("To short password");

  const encryptedPassword = await hash(password, 12);
  const user = await prismaClient.user.create({
    data: {
      id,
      email,
      encryptedPassword,
      profile: { create: { nickname, selfIntroduction } },
    },
  });
  const accessToken = generateAccessToken(user);
  return accessToken;
};

const logIn = async (data: LogInData) => {
  const { email, password } = data;
  const user = await prismaClient.user.findUnique({
    where: { email },
  });
  if (!user) throw new Error("No User");

  const isCorrectPassword = await compare(password, user.encryptedPassword);
  if (!isCorrectPassword) throw new Error("Invalid Password");

  const accessToken = generateAccessToken(user);
  return accessToken;
};

const updateProfile = async (data: UpdateProfileData) => {
  const { nickname, selfIntroduction, userId } = data;
  const profile = await prismaClient.userProfile.update({
    where: { userId },
    data: { nickname, selfIntroduction },
  });

  return profile;
};

const getProfile = async (userId: string) => {
  const profile = await prismaClient.userProfile.findFirst({
    where: { userId },
    select: {
      nickname: true,
      selfIntroduction: true,
      user: {
        select: {
          _count: { select: { followers: true, followings: true } },
          writtenTweets: { orderBy: { createdAt: "desc" } },
        },
      },
    },
  });
  return profile;
};

// 내가 팔로잉하는 사람 (내가 팔로워)
const getFollowings = async (userId: string) => {
  const profile = await prismaClient.follow.findMany({
    where: { followerId: userId },
    include: {
      following: {
        select: {
          profile: { select: { nickname: true, selfIntroduction: true } },
        },
      },
    },
  });
  return profile;
};

//나를 팔로우하는 사람
const getFollowers = async (userId: string) => {
  const profile = await prismaClient.follow.findMany({
    where: { followingId: userId },
    include: {
      follower: {
        select: {
          profile: { select: { nickname: true, selfIntroduction: true } },
        },
      },
    },
  });
  return profile;
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
  updateProfile,
  getProfile,
  getFollowers,
  getFollowings,
};
export default accountsService;
