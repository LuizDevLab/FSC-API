import { prisma } from "../../../prisma/prisma.js";
import { PostgresHelper } from "../../db/postgres/helper.js";

export class PostgresGetUserById {
  async execute(userId) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
