export const Title = ({ text }: { text: string }) => {
  return (
    <div
      className="text-4xl text-[#D4C2FC] font-medium lg:w-fit
      border-[#47474F] border-b-[3px] pb-[0.5rem] px-2"
    >
      {text}
    </div >
  )
}

export const SubTitle = ({ text, iconSrc }: { text: string, iconSrc: string }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <img src={iconSrc} alt="icon" className="h-[2.25] w-[2.25rem]" />
      <div className="text-2xl text-[#D4C2FC] font-medium">{text}</div>
    </div>
  )
}

