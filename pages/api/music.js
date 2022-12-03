import { PrismaClient } from "@prisma/client"
import supabase from "../../supabase";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let prisma;
export default async function getAlbums(req, res) {
    if (!prisma) {
        prisma = new PrismaClient();
    }
    const {data} = await supabase
        .from("Music")
        .select(`
            *,
            Album:id_album(album_cover,Artist:id_artist(artist_name))
        `)
        .in('id_music',[req.query.id_music])
   /*  const music = await prisma.music.findFirst({ where: { id_album: req.query.id_album }, include: { album: { include: { artist: true } } } });
    */ data ? res.status(200).json(data) : res.status(404).json({ message: "Erro" })
}
