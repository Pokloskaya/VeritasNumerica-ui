import { Vector } from "./Matrices";

export const DataTable = ({ columns, rows }: { columns: Array<string>, rows: Array<number>[] }) => {
  return (
    <div className="relative overflow-x-auto w-full rounded-xl">
      <table className="w-full text-left rtl:text-right text-gray-200">
        <thead className="text-gray-300 bg-gray-50">
          <tr className="bg-gray-800 border-b-4 border-gray-700">
            {columns.map((column) => (
              <th scope="col" className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="bg-gray-600 border-b border-gray-500">
              {row.map((cell, i) => (
                <td scope="row" className="px-6 py-4">{
                  columns[i] == "error" && cell == 100
                    ? "-"
                    : cell
                }</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const SystemTable = ({ columns, rows }: { columns: Array<string>, rows: any[] }) => {
  return (
    <div className="relative overflow-x-auto w-full rounded-xl">
      <table className="w-full text-left rtl:text-right text-gray-200">
        <thead className="text-gray-300 bg-gray-50">
          <tr className="bg-gray-800 border-b-4 border-gray-700">
            {columns.map((column) => (
              <th scope="col" className="text-center px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="bg-gray-600 border-b border-gray-500">
              {row.map((cell: any, i: number) => (
                <td scope="row" className="items-center text-center px-6 py-4">{
                  i == 2 && (cell as number) == 100
                    ? "-"
                    : i == 1
                      ? <div className="items-center"><Vector vector={(row[i] as number[])} /></div>
                      : cell
                }</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
