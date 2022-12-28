import MusicDetails from "../../components/MusicDetails";
import InicioPage from "../InicioPage";
import SearchPage from "../SearchPage";
import ShowAll from "../ShowAll";
export default function PagesManager({ page, songsYouMightLike, recents, setAlbum, setPage, getArtistMusicsDetails, data }) {
    switch (page) {
        case "inicio":
            return <InicioPage songsYouMightLike={songsYouMightLike} recents={recents} data={data} setAlbum={setAlbum} setPage={setPage} getArtistMusicsDetails={getArtistMusicsDetails} />
        case "pesquisar":
            return <SearchPage data={data} getArtistMusicsDetails={getArtistMusicsDetails} setPage={setPage} setAlbum={setAlbum} />
        case "details":
            return <MusicDetails />
        case "showAll":
            return <ShowAll getArtistMusicsDetails={getArtistMusicsDetails} setAlbum={setAlbum} />
        default:
            alert(`O parametro: ${page} não corresponde a nenhuma das condições!`)
            break;
    }
}