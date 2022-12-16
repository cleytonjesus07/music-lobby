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

    const { data } = await supabase
        .from("MusicsOnAlbums")
        .select(`
        id_music(*),
        Album:id_album(
            album_cover,
            album_title,
            Artist:id_artist(*)
        )
    `).in("Album.Artist.id_artist", [1])


    /* 
    
    Music:id_music(*),
       Album:id_album(*,Artist:id_artist(*))
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