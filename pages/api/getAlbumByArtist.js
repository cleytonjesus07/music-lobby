import { getDataFromArtist } from '../../utils/api/getData';


export default async function hello(req, res) {
    switch (req.method) {
        case "POST":
            const { id_artist } = req.body;
            const { data, musics } = await getDataFromArtist(id_artist/* , `${path}/` */);
            res.status(200).json({ data, musics });
            break;
        default:
            res.send("Apenas POST!")
            break;
    }
}

