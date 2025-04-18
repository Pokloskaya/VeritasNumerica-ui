import { displayMethod } from './Methods.tsx'
import { useEffect, useState } from 'react'
import { Alert } from '../components/Alert.tsx'
import { Header } from '../components/Header.tsx'
import { ActionButton } from '../components/Buttons.tsx'
import { Title } from '../components/Titles.tsx'
import { Vector, Matrix } from '../components/Matrices.tsx'
import PointsInput from '../components/PointsInput.tsx'
import { FunctionPlot } from '../components/Plot.tsx'
import MathTex from 'react-mathtex'

export interface interpolateValues {
  x: number[],
  y: number[]
}

export const Vandermonde = () => {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState("")

  const [xPoints, setXPoints] = useState<number[]>([0]);
  const [yPoints, setYPoints] = useState<number[]>([0]);

  const [values, setValues] = useState<interpolateValues>({ x: xPoints, y: yPoints })

  const [V, setV] = useState<number[][]>([])
  const [b, setB] = useState<number[]>([])
  const [polynomial, setPolynomial] = useState("")

  const [showPlot, setShowPlot] = useState(false)

  const post = () => {
    fetch(`http://localhost:8000/interpolation/${method}`, {
      method: "POST", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(values)
    }).then((res) => {
      res.json().then((json) => {
        console.log(json)
        if (json.success) {
          setV(json.data.v_matrix)
          setB(json.data.b)
          setPolynomial(json.data.polynomial)
          setShowPlot(true)
        } else {
          if (json.error) {
            setAlert(true)
            setError(json.error)
            setShowPlot(false)
          } else {
            setAlert(true)
            setError("Be sure to fill all the fields correctly.")
            setShowPlot(false)
          }
        }
      })
    }).catch(() => setAlert(true))
  }

  useEffect(() => {
    post()
  }, [showPlot, values])
  

  let method = "vandermonde"
  return (
    <div className="text-white">
      <Header />
      <div className="xl:pl-[10rem] lg:pl-[6rem] lg:pr-0 px-[2rem] pt-5 lg:pt-0 pb-10">
        <Title text={method ? displayMethod(method) : ""} />
      </div>
      <h4 className="text-xl font-medium pb-2 mx-[11rem]">Parameters</h4>
      <div className="flex flex-row gap-10 md:gap-0 justify-between mx-[3rem] lg:mx-[7rem] xl:mx-[11rem] mb-4">
        <div className="flex flex-col gap-5 items-center pt-12 w-full">
          <PointsInput xPoints={xPoints} yPoints={yPoints} setXPoints={setXPoints} setYPoints={setYPoints} />
          <ActionButton text="Calculate"
            func={
              () => {
                setValues({ x: xPoints, y: yPoints })
                setPolynomial("")
                setV([])
                setB([])
                setShowPlot(false)
                setAlert(false)
              }
            } />
        </div>
        {showPlot &&
          <div className="flex flex-col items-center w-full gap-16 pt-10">
            <div className="flex flex-row w-full p-2 bg-[#2B2931] h-fit rounded-lg items-center">
              <FunctionPlot funcStr={polynomial} height={520} width={800} />
            </div>
            <div className="flex flex-col items-center  w-full gap-16">
              <div className="flex flex-row w-full gap-16">
                <Matrix matrix={V} name={'V'} />
                <Vector vector={b} name={'b'} />
              </div>
              <MathTex classname="text-white">
                {`<$>P(x) = ${polynomial}</$>`}
              </MathTex>
            </div>
          </div>
        }
      </div>
      <div className="flex flex-wrap justify-between px-[3rem] xl:px-[11rem] pb-2">
        {alert && <Alert
          bold="Oops! "
          message={error}
          setAlert={setAlert}
          root={false}
        />}
      </div>
    </div>
  )
}
