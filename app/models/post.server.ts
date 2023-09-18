import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug: slug } });
}
