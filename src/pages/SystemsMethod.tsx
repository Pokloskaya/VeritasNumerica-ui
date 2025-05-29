import { displayMethod } from './Methods.tsx'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert } from '../components/Alert.tsx'
import { Header } from '../components/Header.tsx'
import { ActionButton } from '../components/Buttons.tsx'
import { Title } from '../components/Titles.tsx'
import { SystemTable } from '../components/Table.tsx'
import { Vector, Matrix } from '../components/Matrices.tsx'
import {
  SORInput,
  JacobiGaussInput,
  CompareSystemInput
} from '../components/SystemsInputs.tsx'

export interface SystemsMethodProps {
  A: number[][],
  x0: number[],
  b: number[],
  w?: number,
  tol: number,
  niter: number
  relativeError: boolean
}

export const SystemsMethod = () => {
  const [values, setValues] = useState<SystemsMethodProps>();
  const [rows, setRows] = useState<Array<number>[]>([]);
  const [columns, setColumns] = useState<Array<string>>([]);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState("")
  const [x, setX] = useState<number[]>([])
  const [C, setC] = useState<number[]>([])
  const [T, setT] = useState<number[][]>([])
  const [compareResults, setCompareResults] = useState<any[]>([]);
  const [bestMethod, setBestMethod] = useState<string | null>(null);
  const [bestSolution, setBestSolution] = useState<number[] | null>(null);
  const [showRoot, setShowRoot] = useState(false)
  const [showTable, setShowTable] = useState(false)

  const post = () => {
    fetch(`http://localhost:8000/systems/${method}`, {
      method: "POST", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(values)
    }).then((res) => {
      res.json().then((json) => {
        console.log(json)
        if (json.success) {
          setX(json.data.x)
          setShowRoot(true)
          if (json.data.columns) { setColumns(json.data.columns) }
          if (json.data.rows) { setRows(json.data.rows) }
          if (json.data.C) { setC(json.data.C) }
          if (json.data.T) { setT(json.data.T) }
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

  const compareAll = () => {
    fetch("http://localhost:8000/systems/compare_all", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setCompareResults(json.results);
          setBestMethod(json.best_method);
          setBestSolution(json.best_solution);
          setAlert(false);
        } else {
          setCompareResults([]);
          setAlert(true);
          setError("Comparison failed.");
        }
      })
      .catch(() => {
        setCompareResults([]);
        setAlert(true);
        setError("An unexpected error occurred.");
      });
  };
  let { method } = useParams()
  return (
    <div className="text-white">
      <Header />
      <div className="xl:pl-[10rem] lg:pl-[6rem] lg:pr-0 px-[2rem] pt-5 lg:pt-0 pb-10">
        <Title text={method ? displayMethod(method) : ""} />
      </div>
      <div className="flex flex-wrap gap-10 md:gap-0 justify-between mx-[3rem] lg:mx-[7rem] xl:mx-[11rem] mb-4">
        <h4 className="text-xl font-medium pb-2">Parameters</h4>
        {method === "compare_all"
          ? <CompareSystemInput send={setValues} />
          : method === "sor"
            ? <SORInput send={setValues} />
            : <JacobiGaussInput send={setValues} />}
        <div className="flex flex-wrap gap-4 items-center justify-center pt-12 w-full">
          <ActionButton
            text="Calculate"
            func={() => {
              if (method === "compare_all") {
                compareAll()
              } else {
                post()
                setAlert(false)
                setShowRoot(false)
              }
            }}
          />
          {method !== "compare_all" && (
          <ActionButton
            text="Compare Methods"
            func={() => window.location.href = "/methods/systems/compare_all"}
          />
        )}
        </div>
      </div>
      <div className="flex flex-wrap justify-between px-[3rem] xl:px-[11rem] pb-2">
        {alert && <Alert
          bold="Oops! "
          message={error}
          setAlert={setAlert}
          root={false}
        />}
        {showRoot &&
          <div className="flex flex-col items-center w-full gap-16 pt-10">
            <div className="flex flex-row w-full">
              <Matrix matrix={T} name="T" />
              <Vector vector={C} name="C" />
            </div>
            <div className="flex flex-col w-1/2">
              <Vector vector={x} name="x" />
            </div>
          </div>
        }
        <div className="pt-5 w-full">
          {showTable && <SystemTable rows={rows} columns={columns} />}
        </div>
        {compareResults.length > 0 && (
          <div className="pt-10 w-full">
            <h3 className="text-xl font-semibold mb-3">Comparison Results</h3>
            <div className="overflow-x-auto text-sm bg-[#2B2931] p-3 rounded-xl">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Method</th>
                    <th className="px-4 py-2">Success</th>
                    <th className="px-4 py-2">Iterations</th>
                    <th className="px-4 py-2">Final Error</th>
                    <th className="px-4 py-2">Error Message</th>
                  </tr>
                </thead>
                <tbody>
                  {compareResults.map((r, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2">{r.method}</td>
                      <td className="px-4 py-2">{r.success ? "✅" : "❌"}</td>
                      <td className="px-4 py-2">{r.iterations ?? "-"}</td>
                      <td className="px-4 py-2">{r.final_error?.toFixed(6) ?? "-"}</td>
                      <td className="px-4 py-2 text-red-400">{r.error_msg ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {bestMethod && bestSolution && (
              <div className="mt-5 text-lg">
                🏆 <strong>Best method:</strong> {bestMethod}<br />
                <strong>Solution:</strong> [ {bestSolution.map(v => v.toFixed(4)).join(", ")} ]
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
