import { Link } from 'react-router-dom'

export const NormalButton = ({ text, href }: { text: string, href: string }) => {
  return (
    <div>
      <Link to={href}>
        <div className="hover:drop-shadow-[0px_0px_1rem_#5C469C] hover:-translate-y-1 active:translate-y-1 w-[18rem] rounded-xl transition-all
    block text-center bg-[#5C469C] text-white text-xl font-medium py-2 px-4 drop-shadow-lg">
          {text}
        </div>
      </Link>
    </div>
  )
}

export const MethodButton = ({ text, href }: { text: string, href: string }) => {
  return (
    <div>
      <Link to={href}>
        <div className="hover:drop-shadow-[0px_0px_3rem_#8576FF] hover:-translate-y-1 active:translate-y-1 w-[13rem] rounded-xl transition-all
    block border-[3px] border-[#8576FF] text-center text-[#8576FF] text-xl font-medium py-2 px-4">
          {text}
        </div>
      </Link>
    </div>
  )
}

export const ActionButton = ({ text, func }: { text: string, func: Function }) => {
  return (
    <div>
      <div
      className="hover:drop-shadow-[0px_0px_1rem_#5C469C] hover:-translate-y-1 active:translate-y-1 w-[18rem] rounded-xl transition-all
    block text-center bg-[#5C469C] text-white text-xl font-medium py-2 px-4 drop-shadow-lg cursor-pointer"
    onClick={() => func()}
    >
        {text}
      </div>
    </div>
  )
}
