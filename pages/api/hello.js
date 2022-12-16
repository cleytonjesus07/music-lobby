import supabase from "../../supabase"

export default async (req, res) => {
    /* let { data } = await supabase
        .from("Music")
        .select(`
        music_title,
                    MusicsOnAlbums(Album(album_cover,Artist(artist_bio))),
                    CategoriesOnMusics(Category(category_title))
                `).filter("CategoriesOnMusics.Category.category_title", "eq", "Games")
    let m = [];
    data.forEach((music) => {
        if (music.CategoriesOnMusics[0].Category !== null) {
            m.push(music)
        }
    }) */

    let { data } = await supabase
        .from("CategoriesOnMusics")
        .select(`
        Category(category_title),
        Music(music_title,MusicsOnAlbums(Album(album_cover,Artist(id_artist,artist_bio))))  
    `).eq("Category.category_title", "Pop Rock")

    data = data.filter((music) => (music.Category !== null))
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