import MathTex from "react-mathtex";

let style = "flex items-center justify-center text-sky-100 w-full"

export const Matrix = ({ matrix, name }: { matrix: number[][], name?: string }) => {
  let matrixTex = `\\begin{bmatrix} ${matrix.map(row => row.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`
  if (name) {
    matrixTex = `${name} = ${matrixTex}`
  }
  matrixTex = `<$>${matrixTex}</$>`
  return (
    <div className="flex items-center justify-center w-full">
      <MathTex classname={style}>
        {matrixTex}
      </MathTex>
    </div>
  )
}

export const Vector = ({ vector, name }: { vector: number[], name?: string }) => {
  let vectorTex = `\\begin{bmatrix} ${vector.join(' \\\\ ')} \\end{bmatrix}`
  if (name) {
    vectorTex = `${name} = ${vectorTex}`
  }
  vectorTex = `<$>${vectorTex}</$>`
  return (
    <MathTex classname={style}>
      {vectorTex}
    </MathTex>
  )
}
