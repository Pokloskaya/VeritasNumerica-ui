import { Header } from '../components/Header.tsx'
import { Title, SubTitle } from '../components/Titles.tsx'
import { MethodButton } from '../components/Buttons.tsx'
import graphicMethod from '../assets/graphical.svg'
import nonlinear from '../assets/nonlinear.svg'
import matrix from '../assets/matrix.svg'
import interpolation from '../assets/interpolation.svg'

// Arrays to create the methods
let graphicMethodArray = ["plot_function"]
let nonlinearArray = ["bisection", "false_position", "fixed_point", "newton", "secant", "multiple_roots", "compare_all"]
let matrixArray = ["jacobi", "gauss-seidel", "sor", "compare_all"]
let interpolationArray = ["vandermonde", "newton", "lagrange", "linear_spline", "cubic_spline"]

export const displayMethod = (method: string) => {
  // Replace underscores with spaces and make the first letter uppercase
  return method == "sor"
    ? "SOR"
    : method.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

const Section = ({ methodsNames, title, iconSrc, type }: { methodsNames: Array<string>, title: string, iconSrc: string, type: string}) => {
  return (
    <div className="w-full">
      <SubTitle text={title} iconSrc={iconSrc} />
      <div className="flex flex-wrap gap-x-12 gap-y-5 xl:w-[80%] pl-14 md:pl-10 pt-5">
        {methodsNames.map((method) => (
          <MethodButton text={displayMethod(method)} href={`/methods/${type}/${method}`} />
        ))}
      </div>
    </div>
  )
}

export const Methods = () => {
  return (
    <div className="flex flex-col justify-between w-screen">
      <Header />
      <div className="xl:pl-[10rem] lg:pl-[6rem] lg:pr-0 px-[2rem] pt-5 lg:pt-0 pb-5">
        <Title text="Methods" />
      </div>
      <div className="flex flex-col gap-4 pl-[3rem] lg:pl-[8rem] xl:pl-[12rem] pb-5 items-center  w-full h-full">
        <Section methodsNames={graphicMethodArray} title="Graphic method" iconSrc={graphicMethod} type="plot"/>
        <Section methodsNames={nonlinearArray} title="Solving Nonlinear Equations" iconSrc={nonlinear} type="nonlinear"/>
        <Section methodsNames={matrixArray} title="Solving Systems of Equations" iconSrc={matrix} type="systems"/>
        <Section methodsNames={interpolationArray} title="Interpolate Values" iconSrc={interpolation} type="interpolation"/>
      </div>
    </div>
  )
}
