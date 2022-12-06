
import { createContext, useCallback, useState } from "react"
export const appCtx = createContext();

export default function AppContext({ children }) {
    const [page, setPage] = useState("pesquisar");
    const [search,setSearch] = useState("");
    const lockScroll = useCallback((option) => {
        if (option) {
            document.body.classList.add(".lockScroll")
        } else {
            document.body.style.overflow = "unset";
        }
    }, [])

    return (
        <appCtx.Provider
            value={{
                page: { page, setPage },
                scroll: {
                    lockScroll
                },
                search:{search,setSearch}
            }}>
            {children}
        </appCtx.Provider>
    )
}