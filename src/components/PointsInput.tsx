// PointsInput.tsx
import React, { ChangeEvent } from 'react';

interface PointsInputProps {
  xPoints: number[];
  yPoints: number[];
  setXPoints: (xPoints: number[]) => void;
  setYPoints: (yPoints: number[]) => void;
}

const PointsInput: React.FC<PointsInputProps> = ({ xPoints, yPoints, setXPoints, setYPoints }) => {
  const handleInputChange = (index: number, axis: 'x' | 'y') => (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value; // Get the raw string input

    // Attempt to parse the input value as a float
    const value = parseFloat(inputValue);

    // Only update the state if the parsed value is a valid number
    // This allows typing negative signs or decimal points initially without
    // the input immediately reverting to 0 or an old value.
    if (!isNaN(value)) {
      if (axis === 'x') {
        const newXPoints = xPoints.map((point, idx) => (idx === index ? value : point));
        setXPoints(newXPoints);
      } else {
        const newYPoints = yPoints.map((point, idx) => (idx === index ? value : point));
        setYPoints(newYPoints);
      }
    } else if (inputValue === '') {
      // If the input is cleared (empty string), set the point value to 0
      if (axis === 'x') {
        const newXPoints = xPoints.map((point, idx) => (idx === index ? 0 : point));
        setXPoints(newXPoints);
      } else {
        const newYPoints = yPoints.map((point, idx) => (idx === index ? 0 : point));
        setYPoints(newYPoints);
      }
    }
  };

  const addPoint = () => {
    setXPoints([...xPoints, 0]);
    setYPoints([...yPoints, 0]);
  };

  const removePoint = (index: number) => () => {
    // Prevent removing the last point, ensuring there's always at least one point
    if (xPoints.length > 1) {
      setXPoints(xPoints.filter((_, idx) => idx !== index));
      setYPoints(yPoints.filter((_, idx) => idx !== index));
    } else {
      console.warn("Cannot remove the last point. At least one point is required.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 mb-2">
        <p className="w-20 text-center p-2 font-bold text-white">x</p>
        <p className="w-20 text-center p-2 font-bold text-white">y</p>
        <p className="w-[20px]"></p> {/* Placeholder for the remove button column */}
      </div>
      {xPoints.map((_, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <input
            type="number" // The CSS rules will target inputs with this type
            step="any"   // Allows any decimal value
            value={xPoints[index]}
            onChange={handleInputChange(index, 'x')}
            className="w-20 p-2 rounded text-center bg-[#232327] border border-[#47474F] placeholder-[#5C5C67] text-white text-sm block"
            // No inline style or specific class needed here for hiding arrows,
            // as the global CSS rules (which you need to add to your stylesheet)
            // will handle all inputs of type="number".
          />
          <input
            type="number" // The CSS rules will target inputs with this type
            step="any"   // Allows any decimal value
            value={yPoints[index]}
            onChange={handleInputChange(index, 'y')}
            className="w-20 p-2 rounded text-center bg-[#232327] border border-[#47474F] placeholder-[#5C5C67] text-white text-sm block"
            // No inline style or specific class needed here
          />
          <button
            onClick={removePoint(index)}
            className="px-3 py-1 bg-[#8576FF] text-white font-bold rounded"
            disabled={xPoints.length <= 1} // Disable remove button if only one point
          >
            -
          </button>
        </div>
      ))}
      <button
        onClick={addPoint}
        className="px-4 py-2 bg-[#D4C2FC] text-[#47474F] rounded mt-4"
      >
        Add Point
      </button>
    </div>
  );
};

export default PointsInput;