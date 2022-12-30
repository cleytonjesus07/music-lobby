import supabase from '../../supabase';

export async function getDataFromArtist(id_artist) {
    const { data } = await supabase
        .from("Artist")
        .select(`
                    *,
                    Album(*,MusicsOnAlbums(Music:id_music(*)))
                `).in("id_artist", [id_artist]);

    let musics = data[0].Album[0].MusicsOnAlbums;
    const res = [];
    musics.forEach(({ Music: { id_music, music_title, music_link } }) => {
        res.push({
            id: id_music,
            name: music_title,
            song: `${music_link}`
        })
    })

    return {
        data: data[0],
        musics: res
    };
}