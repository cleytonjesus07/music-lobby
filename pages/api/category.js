import { PrismaClient } from "@prisma/client"
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let prisma;
export default async function getAlbums(req, res) {

    if (!prisma) {
        prisma = new PrismaClient();
    }
    const categories = await prisma.category.findMany({ include: { categoriesOnAlbums: { include: { album: { include: { artist: { select: { artist_bio: true } }, music: true } } } } } })
    categories?.length ? res.status(200).json(categories) : res.status(404).json({ message: "Erro" })
}
