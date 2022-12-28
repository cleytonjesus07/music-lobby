import Link from "next/link";

import { useContext, useEffect, useRef, useState,memo } from "react"
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import { appCtx } from "../../Context/AppContext";

let scrollStep;
function Section({ children, title, wrap, seeMore, justifyCenter }) {
  
    const { page: { setPage }, translate } = useContext(appCtx);
    const cardContainerRef = useRef();
    const [showButtons, setShowButtons] = useState(false);
    useEffect(() => {
        if (!cardContainerRef.current) {
            return;
        }

        if (checkOverflow(cardContainerRef.current)) {
            setShowButtons(true);
        } else {
            setShowButtons(false);
        }
    }, [showButtons])

    useEffect(() => {
        scrollStep = cardContainerRef.current.clientWidth;
    }, [])

    function checkOverflow(el) {
        if (el) {
            return el.offsetWidth < el.scrollWidth
        }
        return false;
    }



    function toLeft() {
        const containerScroll = cardContainerRef.current;
        let sl = containerScroll.scrollLeft;
        if ((sl - scrollStep) <= 0) {
            containerScroll.scrollTo(0, 0);
        } else {
            containerScroll.scrollTo((sl - scrollStep), 0);
        }
    }
    function toRight() {
        const containerScroll = cardContainerRef.current;
        let sl = containerScroll.scrollLeft,
            cw = containerScroll.scrollWidth;

        if ((sl + scrollStep) >= cw) {
            containerScroll.scrollTo(cw, 0);
        } else {
            containerScroll.scrollTo((sl + scrollStep), 0);
        }
    }

    return (
        <section>
            <div className="flex justify-between px-9 py-4 items-center">
                <h2 className="text-[1.2em] font-bold">{title}</h2>
                {seeMore && <Link
                    href={{
                        href: "/",
                        query: {
                            cat: title
                        }
                    }}
                    prefetch={false}
                    shallow={true}
                    onClick={() => setPage("showAll")}
                    className="font-bold uppercase text-[.7em] text-neutral-400 hover:underline hover:cursor-pointer">{translate.mainScreen.showAll}</Link>}
            </div>
            <div className="relative w-full" >
                {showButtons && <Buttons toLeft={toLeft} cardContainerRef={cardContainerRef} toRight={toRight} />}
                <div ref={cardContainerRef} className={`relative flex justify-start ${justifyCenter && 'max-sm:justify-center'} scroll-smooth   hiddenScroll overflow-x-auto  ${wrap && "flex-wrap"} px-2`}>
                    {children}
                </div>
            </div>
        </section>
    )
}

function Buttons({ toLeft, toRight, cardContainerRef }) {
    const [showBtns, setShowBtns] = useState({ left: false, right: true })
    
    cardContainerRef.current.addEventListener('scroll', handleScroll)
    function handleScroll(e) {
        const container = e.target;
        if (container.scrollLeft == 0) {
            setShowBtns(old => ({ ...old, left: false, right: true }))
        }
        if (container.scrollLeft >= (container.scrollWidth - scrollStep)) {
            setShowBtns(old => ({ ...old, right: false, left: true }))
        }




    }
    return (
        <div className="absolute btn-container  pointer-events-none flex justify-between items-center h-full w-full " style={{ zIndex: 20 }}>
            <div onClick={toLeft} className={`
                btn-left  bg-opacity-20 h-full flex items-center px-1 pointer-events-auto
                ${!showBtns?.left && 'invisible'}
            `} >
                {/* Back */}
                <button type={"button"} title="left button" className="cursor-pointer ">
                    <AiFillLeftCircle className="w-8 h-8  " />
                </button>
            </div>
            <div onClick={toRight} className={`
                btn-right bg-opacity-20 h-full flex items-center px-1 pointer-events-auto
                ${!showBtns?.right && 'invisible'}
            `} >
                {/* Forward */}
                <button type={"button"} title="right button" className="cursor-pointer ">
                    <AiFillRightCircle className="w-8 h-8" />
                </button>
            </div>
        </div>
    )
}


export default memo(Section);