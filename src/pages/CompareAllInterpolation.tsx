import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Title } from '../components/Titles';
import { Alert } from '../components/Alert';
import { ActionButton } from '../components/Buttons';
import PointsInput from '../components/PointsInput';
import MathTex from 'react-mathtex';
import { FunctionPlot } from '../components/Plot';

export interface interpolateValues {
  x: number[];
  y: number[];
}

export const CompareAllInterpolation = () => {
  const [xPoints, setXPoints] = useState<number[]>([0]);
  const [yPoints, setYPoints] = useState<number[]>([0]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(false);
  const method = 'compare_all';

  const handleCompare = () => {
    if (xPoints.length < 2) {
      setError("Please enter at least two points.");
      setAlert(true);
      return;
    }

    setAlert(false);
    setResult(null);

    fetch(`http://localhost:8000/interpolation/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x: xPoints, y: yPoints })
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(errData => {
            throw new Error(errData.detail || `Server error: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((json) => {
        if (json.success && json.data) {
          setResult(json);
        } else {
          setError(json.error || json.message || 'Failed to process results or data structure mismatch.');
          setAlert(true);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to connect to the server.');
        setAlert(true);
      });
  };

  const apiResponseData = result?.data;
  const methodsObject = apiResponseData?.methods;
  const methodsArray: any[] = methodsObject ? Object.values(methodsObject) : [];
  const bestMethodInfo = apiResponseData?.best;

  // Helper function to get the complete solution string for the best method
  const getCompleteBestSolution = () => {
    if (!bestMethodInfo) return "-";

    const fullBestMethodDetails = methodsArray.find(m => m.method === bestMethodInfo.method);

    if (fullBestMethodDetails?.error_msg) {
      return (
        <span className="text-red-400">Error: {fullBestMethodDetails.error_msg}</span>
      );
    } else if (bestMethodInfo.polynomial && bestMethodInfo.polynomial.trim() !== '') {
      return (
        <MathTex classname="text-white text-base sm:text-lg">{`<$>${bestMethodInfo.polynomial}</$>`}</MathTex>
      );
    } else if ((bestMethodInfo.method === "linear_spline" || bestMethodInfo.method === "cubic_spline") && fullBestMethodDetails?.tracers) {
      return (
        <pre className="text-gray-400 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
          {JSON.stringify(fullBestMethodDetails.tracers, null, 2)}
        </pre>
      );
    } else {
      return "No direct solution representation available.";
    }
  };

  return (
    <div className="text-white min-h-screen">
      <Header />
      <div className="xl:pl-[10rem] lg:pl-[6rem] px-4 sm:px-8 pt-5 pb-20">
        <Title text="Compare All" />
        <div className="my-8"></div>

        {/* Parameters Section - No box, centered content */}
        <div className="mb-12">
          <h4 className="text-2xl font-semibold pb-4 text-gray-200">Parameters</h4>
          <div className="flex flex-col gap-6 items-center"> {/* Reverted items-start to items-center */}
            <PointsInput
              xPoints={xPoints}
              yPoints={yPoints}
              setXPoints={setXPoints}
              setYPoints={setYPoints}
            />
            <ActionButton text="Calculate" func={handleCompare} />
          </div>
        </div>

        {/* Results Section - Table remains detailed */}
        {methodsArray.length > 0 && (
          <div className="space-y-10">
            <div className="pt-10">
              <h4 className="text-xl font-semibold mb-3">Comparison Results</h4>
              <div className="overflow-x-auto text-sm bg-[#2B2931] p-3 rounded-xl">
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Method</th>
                      <th className="px-4 py-2" style={{minWidth: '200px', maxWidth: '600px'}}>Polynomial / Representation</th>
                      <th className="px-4 py-2">Success</th>
                      <th className="px-4 py-2">Error Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {methodsArray.map((item: any) => (
                      <tr key={item.method} className="border-t">
                        <td className="px-4 py-2 capitalize">{item.method.replace('_', ' ')}</td>
                        <td className="px-4 py-2 text-white" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                          {item.polynomial && item.polynomial.trim() !== '' ? (
                            <MathTex classname="text-white text-sm">{`<$>${item.polynomial}</$>`}</MathTex>
                          ) : (item.method === "linear_spline" || item.method === "cubic_spline") && item.tracers ? (
                            <pre className="text-gray-400 text-xs whitespace-pre-wrap max-h-40 overflow-y-auto">
                              {JSON.stringify(item.tracers, null, 2)}
                            </pre>
                          ) : (
                            <span className="italic text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-center">{item.success ? "✅" : "❌"}</td>
                        <td className="px-4 py-2 text-red-400">{item.error_msg ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Best Method Info Block - No box, left aligned */}
            {bestMethodInfo && (
              <div className="mt-5 text-lg text-left">
                <p>🏆 <strong>Best Method:</strong> {bestMethodInfo.method.replace('_', ' ')}</p>
                {/* Displaying Solution: and the content on a new line */}
                <p className="text-base font-semibold mb-2">Solution:</p>
                {getCompleteBestSolution()}
              </div>
            )}
          </div>
        )}

        {alert && <Alert bold="Oops! " message={error} setAlert={setAlert} root={false} />}
      </div>
    </div>
  );
};