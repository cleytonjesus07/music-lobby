import { useContext } from "react"
import AsideMenu from "../components/AsideMenu"
import Card from "../components/Card"
import Section from "../components/Section"
import TopMenu from "../components/TopMenu"
import { songCtx } from "../Context/SongContext"


Home.title = "Web Player"
export default function Home() {
  const { songsCtx: { songs: { items }, setSongs }, soundPlayer: { showPlayer, setShowPlayer } } = useContext(songCtx);

  function selectedMusic(index) {
    setSongs(old => ({ ...old, index: index }))
    setShowPlayer(true);
  }
  return (
    <>
      <AsideMenu />
      <TopMenu />
      <main className="ml-56">
        <Section title={"Pop"}>
          {items.map(({ title, cover }, index) => <Card onClick={() => selectedMusic(index)} key={index} title={title} cover={cover} desc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />)}
        </Section>
      </main>
    </>
  )
}
