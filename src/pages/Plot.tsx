import { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header.tsx'
import { Title } from '../components/Titles.tsx'
import { StringInput } from '../components/Inputs.tsx'
import { FunctionPlot } from '../components/Plot.tsx'

export const Plot = () => {
  const [functionStr, setFunctionStr] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const [plotWidth, setPlotWidth] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setPlotWidth(ref.current.clientWidth * 0.9)
    }
  }, [])

  return (
    <div className="h-screen">
      <div ref={ref} className="w-full">
        <Header />
      </div>
      <div className="xl:pl-[10rem] lg:pl-[6rem] lg:pr-0 px-[2rem] pt-5 lg:pt-0 pb-5">
        <Title text="Function plotter" />
      </div>
      <div className="flex justify-center md:px-14 h-10 w-full">
        <div className="p-2 bg-[#2B2931] h-fit rounded-lg flex flex-col items-center">
          <div className="w-[80%] px-4 pt-2" >
            <StringInput name='f(x)' setVal={setFunctionStr} />
          </div>
          <FunctionPlot funcStr={functionStr} height={520} width={plotWidth} />
        </div>
      </div>
    </div>
  );
}

