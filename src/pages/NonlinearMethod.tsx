import { displayMethod } from './Methods.tsx'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert } from '../components/Alert.tsx'
import { Header } from '../components/Header.tsx'
import { FunctionPlot } from '../components/Plot.tsx'
import { ActionButton } from '../components/Buttons.tsx'
import { Title } from '../components/Titles.tsx'
import { DataTable } from '../components/Table.tsx'
import {
  BisectionInput,
  FixedPointInput,
  FalsePositionInput,
  NewtonInput,
  SecantInput
} from '../components/NonlinearInputs.tsx'

export interface NonlinearMethodProps {
  x0?: string,
  x1?: string,
  a?: string,
  b?: string,
  fx: string,
  gx?: string,
  tol: number,
  niter: number
  relativeError: boolean
}

export const NonlinearMethod = () => {
  const [values, setValues] = useState<NonlinearMethodProps>();
  const [rows, setRows] = useState<Array<number>[]>([]);
  const [columns, setColumns] = useState<Array<string>>([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState("")
  const [root, setRoot] = useState(0)
  const [showRoot, setShowRoot] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [plotHeight, setPlotHeight] = useState(0)
  const [plotWitdth, setPlotWidth] = useState(0)

  const refW = useRef<HTMLDivElement>(null)
  const refH = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (refW.current) {
      setPlotWidth(refW.current.clientWidth)
    }
    if (refH.current) {
      setPlotHeight(refH.current.clientHeight)
    }
  }, [])

  const post = () => {
    fetch(`http://localhost:3000/nonlinear/${method}`, {
      method: "POST", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(values)
    }).then((res) => {
      res.json().then((json) => {
        console.log(json)
        if (json.success) {
          setRoot(json.data.root)
          setShowRoot(true)
          if (json.data.columns) { setColumns(json.data.columns) }
          if (json.data.rows) { setRows(json.data.rows) }
          setShowTable(true)
        } else {
          if (json.error) {
            setAlert(true)
            setError(json.error)
            setShowTable(false)
          } else {
            setAlert(true)
            setError("Be sure to fill all the fields correctly.")
            setShowTable(false)
          }
        }
      })
    }).catch(() => setAlert(true))
  }

  let { method } = useParams()
  return (
    <div className="text-white">
      <Header />
      <div className="xl:pl-[10rem] lg:pl-[6rem] lg:pr-0 px-[2rem] pt-5 lg:pt-0 pb-10">
        <Title text={method ? displayMethod(method) : ""} />
      </div>
      <div className="flex flex-wrap gap-10 md:gap-0 justify-between mx-[3rem] lg:mx-[7rem] xl:mx-[11rem] mb-4">
        <div ref={refH}  className="w-full md:w-4/12">
          <h4 className="text-xl font-medium pb-2">Parameters</h4>
          {method === "bisection"
            ? <BisectionInput send={setValues} />
            : (method === "fixed_point"
              ? <FixedPointInput send={setValues} />
              : (method === "false_position"
                ? <FalsePositionInput send={setValues} />
                : (method === "newton" || method === "multiple_roots"
                  ? <NewtonInput send={setValues} />
                  : <SecantInput send={setValues} />)))}
          <div className="flex items-center justify-center pt-7">
            <ActionButton text="Calculate"
              func={
                () => {
                  post()
                  setAlert(false)
                  setShowRoot(false)
                }
              } />
          </div>
        </div>
        <div ref={refW}  className="w-full md:w-7/12 p-1 h-fit bg-[#2B2931] rounded-lg">
          <FunctionPlot funcStr={values?.fx ?? ""} height={plotHeight} width={plotWitdth} />
        </div>
      </div>
      <div className="flex flex-wrap justify-between px-[3rem] xl:px-[11rem] pb-2">
        {alert && <Alert
          bold="Oops! "
          message={error}
          setAlert={setAlert}
          root={false}
        />}
        {showRoot && <Alert
          bold="Se ha encontrado una solución en "
          message={`x = ${root}`}
          setAlert={setShowRoot}
          root={true}
        />}
        <div className="pt-5 w-full">
          {showTable && <DataTable rows={rows} columns={columns} />}
        </div>
      </div>
    </div>
  )
}
