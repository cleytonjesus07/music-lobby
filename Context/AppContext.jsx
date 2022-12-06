
import { createContext, useCallback } from "react"
export const appCtx = createContext();

export default function AppContext({ children }) {
    const lockScroll = useCallback((option) => {
        if (option) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [])

    return (
        <appCtx.Provider
            value={{
                scroll:{
                    lockScroll
                }
            }}>
            {children}
        </appCtx.Provider>
    )
}