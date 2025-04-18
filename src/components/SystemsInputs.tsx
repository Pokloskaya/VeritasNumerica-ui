import { useEffect, useState } from "react"
import { NumberInput, ToggleInput, MatrixInput, VectorInput } from "./Inputs.tsx"
import { Matrix, Vector } from './Matrices.tsx'

const initialMatrix = (size: number): number[][] => {
  return Array(size).fill(null).map(() => Array(size).fill(0));
};

const initialVector = (size: number): number[] => {
  return Array(size).fill(0);
};

const mat_vec_style = "flex flex-col items-center gap-10"

export const JacobiGaussInput = ({ send }: { send: Function }) => {
  const [size, setSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>(initialMatrix(size));
  const [x0, setX0] = useState<number[]>(initialVector(size));
  const [b, setB] = useState<number[]>(initialVector(size));
  const [tol, setTol] = useState(0);
  const [niter, setNiter] = useState(0);
  const [relativeError, setRelativeError] = useState(false);

  useEffect(() => {
    setMatrix(initialMatrix(size));
    setX0(initialVector(size));
    setB(initialVector(size));
  }, [size])

  useEffect(() => {
    send({ A: matrix, x0: x0, b: b, tol: tol, niter: niter, relativeError: relativeError })
  }, [matrix, x0, b, tol, niter, relativeError])

  return (
    <div className="flex gap-5 w-full flex-col justify-center items-center">
      <div className="flex flex-row items-center justify-between px-20 w-full">
        <label className="text-white">Tolerance</label>
        <NumberInput name="tol" setVal={setTol} type="float" />

        <label className="text-white">Max iterations</label>
        <NumberInput name="niter" setVal={setNiter} type="int" />

      </div>
      <div className="flex flex-col items-center justify-between px-20 pb-5 pt-10 w-full">
        <label className="text-white pb-2">Matrix size</label>
        <NumberInput name="Matrix Size" setVal={setSize} type="int" />
      </div>
      <div className="flex flex-row w-full justify-between px-20">
        <div className="flex flex-col gap-10">
          <Matrix matrix={matrix} name="A" />
          <MatrixInput matrix={matrix} setMatrix={setMatrix} />
        </div>
        <div className={mat_vec_style}>
          <Vector vector={x0} name="x_0" />
          <div className="flex flex-col w-12">
            <VectorInput vector={x0} setVector={setX0} />
          </div>
        </div>
        <div className={mat_vec_style}>
          <Vector vector={b} name="b" />
          <div className="flex flex-col w-12">
            <VectorInput vector={b} setVector={setB} />
          </div>
        </div>
      </div>
      <div className="pt-5 w-[25%]">
        <ToggleInput a="Absolute error" b="Relative error" stateVal={relativeError} setStateVal={setRelativeError} />
      </div>
    </div>
  )
}


export const SORInput = ({ send }: { send: Function }) => {
  const [size, setSize] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>(initialMatrix(size));
  const [x0, setX0] = useState<number[]>(initialVector(size));
  const [b, setB] = useState<number[]>(initialVector(size));
  const [w, setW] = useState(1);
  const [tol, setTol] = useState(0);
  const [niter, setNiter] = useState(0);
  const [relativeError, setRelativeError] = useState(false);

  useEffect(() => {
    setMatrix(initialMatrix(size));
    setX0(initialVector(size));
    setB(initialVector(size));
  }, [size])

  useEffect(() => {
    send({ A: matrix, x0: x0, b: b, w: w, tol: tol, niter: niter, relativeError: relativeError })
  }, [matrix, x0, b, w, tol, niter, relativeError])

  return (
    <div className="flex gap-5 w-full flex-col justify-center items-center">
      <div className="flex flex-row items-center justify-between px-20 w-full gap-10">
        <div className="flex flex-row items-center gap-3">
          <label className="text-white">Tolerance</label>
          <NumberInput name="tol" setVal={setTol} type="float" />
        </div>

        <div className="flex flex-row items-center gap-3">
          <label className="text-white">w</label>
          <NumberInput name="w" setVal={setW} type="float" />
        </div>

        <div className="flex flex-row items-center gap-3">
          <label className="text-white">Max iterations</label>
          <NumberInput name="niter" setVal={setNiter} type="int" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between px-20 pb-5 pt-10 w-full">
        <label className="text-white pb-2">Matrix size</label>
        <NumberInput name="Matrix Size" setVal={setSize} type="int" />
      </div>
      <div className="flex flex-row w-full justify-between px-20">
        <div className="flex flex-col gap-10">
          <Matrix matrix={matrix} name="A" />
          <MatrixInput matrix={matrix} setMatrix={setMatrix} />
        </div>
        <div className={mat_vec_style}>
          <Vector vector={x0} name="x_0" />
          <div className="flex flex-col w-12">
            <VectorInput vector={x0} setVector={setX0} />
          </div>
        </div>
        <div className={mat_vec_style}>
          <Vector vector={b} name="b" />
          <div className="flex flex-col w-12">
            <VectorInput vector={b} setVector={setB} />
          </div>
        </div>
      </div>
      <div className="pt-5 w-[25%]">
        <ToggleInput a="Absolute error" b="Relative error" stateVal={relativeError} setStateVal={setRelativeError} />
      </div>
    </div>
  )
}
