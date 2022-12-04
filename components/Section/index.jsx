
export default function Section({ children, title }) {
    return (
        <section>
            <div className="flex justify-between px-10 py-2 items-center">
                <h2 className="text-3xl font-bold">{title}</h2>
                <span className="font-bold uppercase text-[.7em] text-neutral-400 hover:underline hover:cursor-pointer">Mostrar tudo</span>
            </div>
            <div className="flex flex-wrap justify-start px-5 max-sm:justify-center ">
                {children}
            </div>
        </section>
    )
}