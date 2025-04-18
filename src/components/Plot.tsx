import { useEffect, useRef } from 'react';
import { create, all } from 'mathjs'
import functionPlot, { FunctionPlotDatum } from 'function-plot';

let xScale: [number, number] = [-3, 3]

const computeYScale = (width: number, height: number, xScale: [number, number]): [number, number] => {
  const xDiff = xScale[1] - xScale[0]
  const yDiff = height * xDiff / width
  return [-yDiff / 2, yDiff / 2]
}

const plot = (ref: React.RefObject<HTMLDivElement>, dimensions: [number, number], data: [FunctionPlotDatum] | FunctionPlotDatum[] | undefined) => {
  if (ref.current) {
    functionPlot({
      target: ref.current,
      width: dimensions[0],
      height: dimensions[1],
      grid: false,
      data: data,
      xDomain: xScale,
      yDomain: computeYScale(dimensions[0], dimensions[1], xScale)
    });
  }
}

const stylePlot = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    const svgElement = ref.current.querySelector('svg');
    if (svgElement) {
      const lines = svgElement.querySelectorAll('path.line');
      lines.forEach(line => {
        (line as SVGPathElement).style.strokeWidth = '2'; // Change line color
      });

      svgElement.style.backgroundColor = '#00000000'; // Change background color
      svgElement.style.color = '#b3afaf'; // Change text color (axis labels, etc.)

      const texts = svgElement.querySelectorAll('text');
      texts.forEach(text => {
        text.style.fill = '#b3afaf';
      });

      const paths = svgElement.querySelectorAll('path.origin, path.domain');
      paths.forEach(path => {
        (path as SVGPathElement).style.stroke = '#b3afaf88'; // Change stroke color
        (path as SVGPathElement).style.fill = 'none'; // Change fill color
      });
    }
  }
}

export const FunctionPlot = ({ funcStr, height, width }: { funcStr: string, height: number, width: number }) => {
  const plotRef = useRef<HTMLDivElement>(null);

  const math = create(all)
  math.import({ ln: (x: number) => math.log(x, math.e) });

  let lineSetting: FunctionPlotDatum = {
    fn: funcStr,
    color: '#ae58ff',
    graphType: 'polyline',
    sampler: 'builtIn',
  }

  useEffect(() => {
    try {
      plot(plotRef, [width, height], lineSetting.fn ? [lineSetting] : undefined)
      stylePlot(plotRef)
    } catch (e) {
      console.error("Falló con", funcStr)
      plot(plotRef, [width, height], undefined)
      stylePlot(plotRef)
    }
  }, [funcStr, height, width]);

  return (
    <div className="w-full h-full">
      <div ref={plotRef} className="plot-container w-full h-auto rounded-xl"></div>
    </div>
  );
};

export const SplinesPlot = ({ funcs, height, width }: { funcs: [[number, number], string][], height: number, width: number }) => {
  const plotRef = useRef<HTMLDivElement>(null);

  const math = create(all)
  math.import({ ln: (x: number) => math.log(x, math.e) });

  let lineSettings: FunctionPlotDatum[] = funcs.map((func) => {
    let lineSetting: FunctionPlotDatum = {
      fn: func[1],
      range: func[0],
      graphType: 'polyline',
      sampler: 'builtIn',
    }
    return lineSetting
  })

  useEffect(() => {
    try {
      plot(plotRef, [width, height], lineSettings)
      stylePlot(plotRef)
    } catch (e) {
      plot(plotRef, [width, height], undefined)
      stylePlot(plotRef)
    }
  }, [funcs, height, width]);

  return (
    <div className="w-full h-full">
      <div ref={plotRef} className="plot-container w-full h-auto rounded-xl"></div>
    </div>
  );
};
