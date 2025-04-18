import React, { ChangeEvent } from 'react';

interface PointsInputProps {
  xPoints: number[];
  yPoints: number[];
  setXPoints: (xPoints: number[]) => void;
  setYPoints: (yPoints: number[]) => void;
}

const PointsInput: React.FC<PointsInputProps> = ({ xPoints, yPoints, setXPoints, setYPoints }) => {
  const handleInputChange = (index: number, axis: 'x' | 'y') => (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value) || 0;
    if (!isNaN(value)) {
      if (axis === 'x') {
        const newXPoints = xPoints.map((point, idx) => (idx === index ? value : point));
        setXPoints(newXPoints);
      } else {
        const newYPoints = yPoints.map((point, idx) => (idx === index ? value : point));
        setYPoints(newYPoints);
      }
    }
  };

  const addPoint = () => {
    setXPoints([...xPoints, 0]);
    setYPoints([...yPoints, 0]);
  };

  const removePoint = (index: number) => () => {
    setXPoints(xPoints.filter((_, idx) => idx !== index));
    setYPoints(yPoints.filter((_, idx) => idx !== index));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 mb-2">
        <p className="w-20 text-center p-2 font-bold text-white">x</p>
        <p className="w-20 text-center p-2 font-bold text-white">y</p>
        <p className="w-[20px]"></p>
      </div>
      {xPoints.map((_, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <input
            step="0.1"
            value={xPoints[index]}
            onChange={handleInputChange(index, 'x')}
            className="w-20 p-2 rounded text-center bg-[#232327] border border-[#47474F] placeholder-[#5C5C67] text-white text-sm block "
          />
          <input
            step="0.1"
            value={yPoints[index]}
            onChange={handleInputChange(index, 'y')}
            className="w-20 p-2 rounded text-center bg-[#232327] border border-[#47474F] placeholder-[#5C5C67] text-white text-sm block "
          />
          <button
            onClick={removePoint(index)}
            className="px-3 py-1 bg-[#8576FF] text-white font-bold rounded"
          >
            -
          </button>
        </div>
      ))}
      <button
        onClick={addPoint}
        className="px-4 py-2 bg-[#D4C2FC] text-[#47474F]  rounded mt-4"
      >
        Add Point
      </button>
    </div>
  );
};

export default PointsInput;
