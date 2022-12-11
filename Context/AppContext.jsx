
import { createContext, useCallback, useDeferredValue, useState } from "react"
export const appCtx = createContext();

export default function AppContext({ children }) {
    const [page, setPage] = useState("início");
    const [search, setSearch] = useState("");
    const deferredValue = useDeferredValue(search);
    const handleOnChange = (e) => {
        const value = e.target.value;
        setSearch(value)

    }
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
                search: { search, handleOnChange, deferredValue }
            }}>
            {children}
        </appCtx.Provider>
    )
}