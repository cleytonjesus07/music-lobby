import Image from "next/image"
import { IoMdPlayCircle } from "react-icons/io"
export default function Card({ title, desc, cover, onClick }) {
    return (
        <div onClick={onClick} className="bg-gradient-to-b from-neutral-800 to-neutral-900  h-60 w-[20%] max-w-[100px] min-w-[calc(200px)] max-sm:w-[100%] px-2 py-3 flex flex-col rounded-md card hover:to-neutral-700 hover:from-neutral-700 transition-all mx-2 my-4 cursor-pointer">
            <div className="h-[400px] bg-neutral-900 relative bg-center bg-no-repeat bg-cover">
                <Image src={cover} decoding="sync"  sizes="(max-width: 768px) 100%,(max-width: 1200px) 50%,33%" alt="capa do album" fill loading="eager" className="object-cover object-top" />
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