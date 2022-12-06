
export default function Section({ children, title }) {
    return (
        <section>
            <div className="flex justify-between px-9 py-4 items-center">
                <h2 className="text-2xl font-bold">{title}</h2>
                <span className="font-bold uppercase text-[.7em] text-neutral-400 hover:underline hover:cursor-pointer">Mostrar tudo</span>
            </div>
            <div className="flex flex-wrap justify-start px-5 max-sm:justify-center ">
                {children}
            </div>
        </section>
    )
}