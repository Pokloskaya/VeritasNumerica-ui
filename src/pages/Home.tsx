import { Header } from '../components/Header.tsx'
import { NormalButton } from '../components/Buttons.tsx'
import { HomeText } from '../components/HomeText.tsx'
import piGuy from '../assets/pi_man.svg'

export const Home = () => {
  return (
    <div className="flex flex-col items-center gap-10 lg:gap-0 justify-between h-screen px-4">
      <Header />
      <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-[10rem]">
        <HomeText />
        <img src={piGuy} alt="piGuy" className="h-[25rem]" />
      </div>
      <div className="flex items-center justify-center py-[4rem]">
        <NormalButton text="Comenzar" href="/methods" />
      </div>
    </div>
  )
}
