
import { createContext, useDeferredValue, useState } from "react"
export const appCtx = createContext();

export default function AppContext({ children }) {
    const [page, setPage] = useState("início");
    const [search, setSearch] = useState("");
    const deferredValue = useDeferredValue(search);
    const handleOnChange = (e) => {
        const value = e.target.value;
        setSearch(value)

    }
   

    return (
        <appCtx.Provider
            value={{
                page: { page, setPage },
                search: { search, handleOnChange, deferredValue }
            }}>
            {children}
        </appCtx.Provider>
    )
}