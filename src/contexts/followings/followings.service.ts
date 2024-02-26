import prismaClient from "../../prisma/client.prisma";
import { AddFollowingData, DeleteFollowingData } from "./followings.type";

const addFollow = async (data: AddFollowingData) => {
  const { followerId, followingId } = data;
  const following = await prismaClient.follow.create({
    data: { followerId, followingId },
  });
  return following;
};

const deleteFollow = async (data: DeleteFollowingData) => {
  const { followerId, followingId } = data;
  const following = await prismaClient.follow.delete({
    where: { followerId_followingId: { followerId, followingId } },
  });
  return following;
};

const followingsService = {
  addFollow,
  deleteFollow,
};
export default followingsService;
