import { Link } from 'react-router-dom'
import gitHubIcon from '../assets/Github.svg'
import linkedInIcon from '../assets/LinkedIn.svg'

export const Header = () => {
  let imgStyle = "h-[2.5rem]"
  let linkStyle = "text-[#8B839C] hover:text-[#c4c4c4] hover:drop-shadow-[0_0_1rem_#c4c4c4] transition-all"
  return (
    <div className="flex flex-wrap items-center justify-center w-screen pt-5 pb-2 px-5 sm:justify-between md:px-10">
      <div className="flex justify-center items-center gap-5 p-2 sm:p-0">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:-translate-y-1 active:translate-y-1 transition-all"
        >
          <img
            src="https://sdmntprwestus.oaiusercontent.com/files/00000000-38ec-6230-b78a-b04305962d85/raw?se=2025-04-18T20%3A05%3A27Z&sp=r&sv=2024-08-04&sr=b&scid=5e06a8ff-9e12-53ba-a879-df8113236840&skoid=e4438ed3-2a6f-4fd3-bf63-222012dc627c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-17T20%3A25%3A39Z&ske=2025-04-18T20%3A25%3A39Z&sks=b&skv=2024-08-04&sig=NZyY51Zzrsr7BUzi7nmphH6t/oSNylSIdTUNK2/iAkg%3D"
            alt="avatar"
            className="h-[3.5rem] w-[3.5rem] rounded-lg"
          />
        </a>
      </div>
      <div className="flex flex-row justify-between gap-5 px-10 md:px-0 md:gap-20">
        <Link to="/">
          <span className={linkStyle}>Home</span>
        </Link>
        <Link to="/methods">
          <span className={linkStyle}>Methods</span>
        </Link>
      </div>
      <div className="flex w-[6.5rem] justify-between sm:p-0">
        <a
          href="https://github.com/Adrephos"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:-translate-y-1 active:translate-y-1 transition-all"
        >
          <img className={imgStyle} src={gitHubIcon} alt="GitHub logo" />
        </a>
        <a
          href="https://www.linkedin.com/in/adrephos/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:-translate-y-1 active:translate-y-1 transition-all"
        >
          <img className={imgStyle} src={linkedInIcon} alt="LinkedIn logo" />
        </a>
      </div>
    </div>
  )
}
