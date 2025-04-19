import { useEffect, useState } from "react"
import { StringInput, NumberInput, ToggleInput } from "./Inputs"

export const BisectionInput = ({ send }: { send: Function }) => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [tol, setTol] = useState(0);
  const [fx, setFx] = useState("");
  const [niter, setNiter] = useState(0);
  const [relativeError, setRelativeError] = useState(false);

  useEffect(() => {
    send({ a: a, b: b, tol: tol, fx: fx, niter: niter, relativeError: relativeError })
  }, [a, b, tol, fx, niter, relativeError])

  return (
    <div className="flex gap-5 w-full flex-col justify-center">
      <StringInput name="a" setVal={setA} />
      <StringInput name="b" setVal={setB} />
      <StringInput name="f(x)" setVal={setFx} />
      <NumberInput name="tol" setVal={setTol} type="float" />
      <NumberInput name="niter" setVal={setNiter} type="int" />
      <ToggleInput
        a="Significant Figures"
        b="Correct decimals"
        stateVal={relativeError}
        setStateVal={setRelativeError}
      />
    </div>
  )
}

export const FixedPointInput = ({ send }: { send: Function }) => {
  const [x0, setX0] = useState("");
  const [fx, setFx] = useState("");
  const [gx, setGx] = useState("");
  const [tol, setTol] = useState(0);
  const [niter, setNiter] = useState(0);
  const [relativeError, setRelativeError] = useState(false);

  useEffect(() => {
    send({ x0: x0, tol: tol, fx: fx, gx: gx, niter: niter, relativeError: relativeError })
  }, [x0, tol, fx, gx, niter, relativeError])

  return (
    <div className="flex gap-5 w-full flex-col justify-center">
      <StringInput name="x0" setVal={setX0} />
      <StringInput name="f(x)" setVal={setFx} />
      <StringInput name="g(x)" setVal={setGx} />
      <NumberInput name="tol" setVal={setTol} type="float" />
      <NumberInput name="niter" setVal={setNiter} type="int" />
      <ToggleInput
        a="Significant Figures"
        b="Correct decimals"
        stateVal={relativeError}
        setStateVal={setRelativeError}
      />
    </div>
  )
}

export const FalsePositionInput = ({ send }: { send: Function }) => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [fx, setFx] = useState("");
  const [tol, setTol] = useState(0);
  const [niter, setNiter] = useState(0);
  const [relativeError, setRelativeError] = useState(false);

  useEffect(() => {
    send({ a: a, b: b, tol: tol, fx: fx, niter: niter, relativeError: relativeError })
  }, [a, b, tol, fx, niter, relativeError])
  return (
    <div className="flex gap-5 w-full flex-col justify-center">
      <StringInput name="a" setVal={setA} />
      <StringInput name="b" setVal={setB} />
      <StringInput name="f(x)" setVal={setFx} />
      <NumberInput name="tol" setVal={setTol} type="float" />
      <NumberInput name="niter" setVal={setNiter} type="int" />
      <ToggleInput
        a="Significant Figures"
        b="Correct decimals"
        stateVal={relativeError}
        setStateVal={setRelativeError}
      />
    </div>
  )
}

export const NewtonInput = ({ send }: { send: Function }) => {
  const [x0, setX0] = useState("");
  const [fx, setFx] = useState("");
  const [tol, setTol] = useState(0);
  const [niter, setNiter] = useState(0);
  const [relativeError, setRelativeError] = useState(false);

  useEffect(() => {
    send({ x0: x0, tol: tol, fx: fx, niter: niter, relativeError: relativeError })
  }, [x0, tol, fx, niter, relativeError])
  return (
    <div className="flex gap-5 w-full flex-col justify-center">
      <StringInput name="x0" setVal={setX0} />
      <StringInput name="f(x)" setVal={setFx} />
      <NumberInput name="tol" setVal={setTol} type="float" />
      <NumberInput name="niter" setVal={setNiter} type="int" />
      <ToggleInput
        a="Significant Figures"
        b="Correct decimals"
        stateVal={relativeError}
        setStateVal={setRelativeError}
      />
    </div>
  )
}

export const SecantInput = ({ send }: { send: Function }) => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [tol, setTol] = useState(0);
  const [fx, setFx] = useState("");
  const [niter, setNiter] = useState(0);
  const [relativeError, setRelativeError] = useState(false);

  useEffect(() => {
    send({ x0: a, x1: b, tol: tol, fx: fx, niter: niter, relativeError: relativeError })
  }, [a, b, tol, fx, niter, relativeError])
  return (
    <div className="flex gap-5 w-full flex-col justify-center">
      <StringInput name="a" setVal={setA} />
      <StringInput name="b" setVal={setB} />
      <StringInput name="f(x)" setVal={setFx} />
      <NumberInput name="tol" setVal={setTol} type="float" />
      <NumberInput name="niter" setVal={setNiter} type="int" />
      <ToggleInput
        a="Significant Figures"
        b="Correct decimals"
        stateVal={relativeError}
        setStateVal={setRelativeError}
      />
    </div>
  )
}

export const CompareInput = ({ send }: { send: Function }) => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [x0, setX0] = useState("");
  const [x1, setX1] = useState("");
  const [fx, setFx] = useState("");
  const [gx, setGx] = useState("");
  const [tol, setTol] = useState(0);
  const [niter, setNiter] = useState(0);
  const [relativeError, setRelativeError] = useState(false);

  useEffect(() => {
    send({
      a, b, x0, x1, fx, gx, tol, niter, relativeError
    })
  }, [a, b, x0, x1, fx, gx, tol, niter, relativeError])

  return (
    <div className="flex gap-5 w-full flex-col justify-center">
      <StringInput name="a (for interval methods)" setVal={setA} />
      <StringInput name="b (for interval methods)" setVal={setB} />
      <StringInput name="x0 (initial guess)" setVal={setX0} />
      <StringInput name="x1 (second guess, if needed)" setVal={setX1} />
      <StringInput name="f(x)" setVal={setFx} />
      <StringInput name="g(x) (only for Fixed Point)" setVal={setGx} />
      <NumberInput name="tol" setVal={setTol} type="float" />
      <NumberInput name="niter" setVal={setNiter} type="int" />
      <ToggleInput
        a="Significant Figures"
        b="Correct decimals"
        stateVal={relativeError}
        setStateVal={setRelativeError}
      />
    </div>
  );
}
