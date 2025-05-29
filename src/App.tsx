import './App.css'
import { Home } from './pages/Home.tsx'
import { Methods } from './pages/Methods.tsx'
import { NonlinearMethod } from './pages/NonlinearMethod.tsx'
import { SystemsMethod } from './pages/SystemsMethod.tsx'
import { Plot } from './pages/Plot.tsx'
import Error from './pages/Error.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Vandermonde } from './pages/Vandermonde.tsx'
import { NewtonInterpolant } from './pages/NewtonInterpolant.tsx'
import { Lagrange } from './pages/Lagrange.tsx'
import { LinearSpline } from './pages/LinearSpline.tsx'
import { CubicSpline } from './pages/CubicSpline.tsx'
import { CompareAllInterpolation } from './pages/CompareAllInterpolation.tsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "methods/",
    element: <Methods />,
  },
  {
    path: "methods/nonlinear/:method",
    element: <NonlinearMethod />,
  },
  {
    path: "methods/systems/:method",
    element: <SystemsMethod />,
  },
  {
    path: "methods/interpolation/vandermonde",
    element: <Vandermonde />,
  },
  {
    path: "methods/interpolation/newton",
    element: <NewtonInterpolant />,
  },
  {
    path: "methods/interpolation/lagrange",
    element: <Lagrange />,
  },
  {
    path: "methods/interpolation/linear_spline",
    element: <LinearSpline />,
  },
  {
    path: "methods/interpolation/cubic_spline",
    element: <CubicSpline />,
  },
  {
    path: "methods/plot/plot_function",
    element: <Plot />,
  },
  {
  path: "methods/interpolation/compare_all",
  element: <CompareAllInterpolation />
  }
]);


function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App