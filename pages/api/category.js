import { PrismaClient } from "@prisma/client"
import supabase from "../../supabase";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let prisma;
export default async function getAlbums(req, res) {

    
    if (!prisma) {
        prisma = new PrismaClient();
    }
    const { data } = await supabase
        .from("Category")
        .select(`
            id_category,
            category_title,
            CategoriesOnAlbums(
                Album:id_album(
                    *,
                    Artist:id_artist(artist_bio),
                    Music(*)
                )
            )
        `);
    /*  const categories = await prisma.category.findMany({ include: { categoriesOnAlbums: { include: { album: { include: { artist: { select: { artist_bio: true } }, music: true } } } } } })
     */
    data?.length ? res.status(200).json(data) : res.status(404).json({ message: "Erro" })
}
