
/* Translations */
import ptBR from "../i18n/ptBR/ptBR.json"
import enUS from "../i18n/enUS/enUS.json"
/*  */
import { useRouter } from "next/router";
import { createContext, useDeferredValue, useState } from "react"
export const appCtx = createContext();

export default function AppContext({ children }) {
    const router = useRouter();
    const { locale } = router;
    let translate = (locale == "pt-BR") ? ptBR : enUS;

    const [page, setPage] = useState('inicio');
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
                search: { search, handleOnChange, deferredValue },
                translate
            }}>
            {children}
        </appCtx.Provider>
    )
}