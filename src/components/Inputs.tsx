import { useState } from "react"

let inputStyle = "bg-[#232327] border border-[#47474F] placeholder-[#5C5C67] text-white text-sm rounded-lg block w-full p-2.5 "

export const StringInput = ({ name, setVal }: { name: string, setVal: Function }) => {
  return (
    <div>
      <input placeholder={name} className={inputStyle}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  )
}

export const NumberInput = ({ name, setVal, type }: { name: string, setVal: Function, type: string }) => {
  return (
    <div>
      <input placeholder={name} className={inputStyle}
        onChange={(e) => setVal(
          type === "int"
            ? parseInt(e.target.value) || 0
            : parseFloat(e.target.value) || 0
        )}
      />
    </div>
  )
}

export const ToggleInput = (
  { a, b, stateVal, setStateVal }:
    { a: string, b: string, stateVal: boolean, setStateVal: Function }
) => {
  return (
    <div>
      <label
        htmlFor="toggle"
        className="w-full h-fit flex items-stretch justify-center rounded-md cursor-pointer"
      >
        <input
          id="toggle"
          type="checkbox"
          className="hidden peer"
          checked={stateVal}
          onChange={() => setStateVal(!stateVal)} />
        <span className="w-1/2 h-[100%] text-center px-4 py-[0.75rem] rounded-l-md bg-[#44279A]
        text-white peer-checked:bg-[#2B2931]"
        >
          {a}
        </span>
        <span className="w-1/2 h-[100%] text-center px-4 py-[0.75rem] rounded-r-md bg-[#2B2931]
        text-white peer-checked:bg-[#44279A]">
          {b}
        </span>
      </label>
    </div>
  )
}

interface MatrixInputProps {
  matrix: number[][];
  setMatrix: (matrix: number[][]) => void;
}

export const MatrixInput: React.FC<MatrixInputProps> = ({ matrix, setMatrix }) => {
  const [show, setShow] = useState(false);
  const handleInputChange = (rowIndex: number, colIndex: number, value: number) => {
    if (!isNaN(value)) {
      const newMatrix = matrix.map((row, rIdx) =>
        row.map((col, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : col))
      );
      setMatrix(newMatrix);
    }
  };

  return (
    <div>
      {show && (
        <div className="pb-5">
          {
            matrix.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((_, colIndex) => (
                  <div className="flex w-12">
                    <NumberInput
                      name={`a${rowIndex + 1}${colIndex + 1}`}
                      type="float"
                      setVal={(val: number) => { handleInputChange(rowIndex, colIndex, val) }}
                    />
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      )}
      <button className="bg-[#44279A] text-white rounded-lg p-1 w-full"
        onClick={() => setShow(!show)}>
        {show ? "Save" : "Edit"}
      </button>
    </div>
  );
};


interface VectorInputProps {
  vector: number[];
  setVector: (vector: number[]) => void;
}

export const VectorInput: React.FC<VectorInputProps> = ({ vector, setVector }) => {
  const [show, setShow] = useState(false);

  const handleInputChange = (index: number, value: number) => {
    if (!isNaN(value)) {
      const newVector = vector.map((val, idx) => (idx === index ? value : val));
      setVector(newVector);
    }
  };

  return (
    <div>
      {show && (
        <div className="pb-5">
          {
            vector.map((_, index) => (
              <NumberInput
                name={`a${index + 1}`}
                type="float"
                setVal={(val: number) => { handleInputChange(index, val) }}
              />
            ))
          }
        </div>
      )}
      <button className="bg-[#44279A] text-white rounded-lg p-2 w-full"
        onClick={() => setShow(!show)}>
        {show ? "Save" : "Edit"}
      </button>
    </div>
  );
};
