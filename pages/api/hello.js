import supabase from "../../supabase"

export default async (req, res) => {
    const { data } = await supabase
        .from("Album")
        .select(`Artist(*),
        MusicsOnAlbums(Music(*))
`).eq('id_artist',4)
    /* const { data } = await supabase
        .from("CategoriesOnAlbums")
        .select(`
                Category(*),Album(*,MusicsOnAlbums(Music(*)))
        `).order("category_title",{ascending:true}) */

    /* 
    

    Todas as músicas do artista

    const { data } = await supabase
        .from("Music")
        .select(`
            *,
            Album:id_album(album_cover,Artist:id_artist(id_artist,artist_name,artist_bio))
        `)
        .in('Album.id_artist', [req.query.id_artist]) 
        */



    res.status(200).json(data)
}




/* 
    
    As músicas recentes 

    const { data } = await supabase
        .from("Music")
        .select(`
         *,
          Album(
              *,
              Artist(*)
              )
      `).order("id_music", { ascending: false }) */

/*
 
Músicas por categoria
 
const { data } = await supabase
  .from("Category")
  .select(`
      id_category,
      category_title,
      CategoriesOnAlbums(
          Album:id_album(
              *,
              Artist:id_artist(id_artist,artist_bio),
              Music(*)
          )
      )
  `); */