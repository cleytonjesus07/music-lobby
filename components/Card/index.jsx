import { IoMdPlayCircle } from "react-icons/io"
export default function Card({ title, desc, cover, onClick }) {
    return (
        <div onClick={onClick} className="bg-gradient-to-b from-neutral-800 to-neutral-900  h-60 w-[180px] px-2 py-3 flex flex-col rounded-md card hover:to-neutral-700 hover:from-neutral-700 transition-all my-5 mx-3 cursor-pointer">
            <div className="flex-[100] bg-neutral-900 relative bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${cover})` }}>
                <div className="absolute -bottom-1 right-0 w-14 h-14 opacity-0 play ">
                    <IoMdPlayCircle className="w-full h-full fill-green-600" />
                </div>
            </div>
            <div className="flex-auto">
                <div className="text-sm font-bold my-2">{title}</div>
                <div className="font-extralight text-sm text-neutral-400 line-clamp-3">{desc}</div>
            </div>
        </div>
    )
}