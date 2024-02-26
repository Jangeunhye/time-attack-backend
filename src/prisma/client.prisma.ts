import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient().$extends({
  query: {
    user: {
      async create({ model: _, operation: __, args, query }) {
        args.data = {
          ...args.data,
          profile: { create: {} },
        };
        return query(args);
      },
    },
  },
});

export default prismaClient;
