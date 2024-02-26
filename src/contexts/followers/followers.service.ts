import prismaClient from "../../prisma/client.prisma";
import { DeleteFollowerData } from "./followers.type";

const deleteFollower = async (data: DeleteFollowerData) => {
  const { followerId, followingId } = data;
  const follower = await prismaClient.follow.delete({
    where: { followerId_followingId: { followerId, followingId } },
  });
  return follower;
};

const followersService = { deleteFollower };
export default followersService;
