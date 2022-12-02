import PocketBase from "pocketbase";
const url = 'https://music-lobby.pockethost.io'
const pb = new PocketBase(process.env.NEXT_PUBLIC_BASE_URL);
pb.autoCancellation(false);

const methods = {
    async musics() {
        let songs = await pb.collection("songs").getFullList();
        songs.forEach((song) => {
            song.cover = `${pb.baseUrl}/api/files/${song.collectionId}/${song.id}/${song.cover}`
            /* song.audio = `${pb.baseUrl}/api/files/${song.collectionId}/${song.id}/${song.audio}` */
        })
        return songs;
    }
}

export default methods;