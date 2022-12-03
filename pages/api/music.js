import { PrismaClient } from "@prisma/client"
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let prisma;
export default async function getAlbums(req, res) {
    if (!prisma) {
        prisma = new PrismaClient();
    }
    const music = await prisma.music.findFirst({ where: { id_album: req.query.id_album }, include: { album: { include: { artist: true } } } });
    music ? res.status(200).json(music) : res.status(404).json({ message: "Erro" })
}
