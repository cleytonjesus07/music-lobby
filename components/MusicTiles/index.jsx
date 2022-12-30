import Image from "next/image";

export default function MusicTiles({ id_artist, setAlbum, setPage, album_cover, music_title, getArtistMusicsDetails }) {
    return (
        <div onClick={() => getArtistMusicsDetails(id_artist, setAlbum, setPage)} className="musicTile bg-gradient-to-b from-neutral-800 to-neutral-900 flex  w-80 hover:to-neutral-700 hover:from-neutral-700 transition-all cursor-pointer rounded-lg overflow-hidden  min-w-[calc(200px)] max-sm:w-[100%] relative bg-center bg-no-repeat bg-cover" style={{ margin: "10px", height: 80, backgroundImage: `url(${album_cover})` }}>
            <div className="max-md:hidden absolute  overflow-hidden   bg-neutral-900  bg-center bg-no-repeat bg-cover" style={{ width: 90, height: 90, left: "-20px", borderRadius: "0 100px 100px 0" }}>
                <Image src={album_cover} decoding="sync" loading="eager" fill sizes="(max-width: 768px) 100%,(max-width: 1200px) 50%,33%" style={{ objectFit: "cover", objectPosition: "top" }} alt="album cover" />
            </div>
            <div className="flex justify-center items-center  bg-black bg-opacity-70 w-full px-3 ">
                <div className=" text-sm font-bold w-full  bg-black bg-opacity-70   rounded-md  p-2 text-center z-50 "  ><span className="line-clamp-2">{music_title}</span></div>
            </div>
        </div>
    )
}