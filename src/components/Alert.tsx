export const Alert = ({ message, bold, setAlert, root }: { message: string, bold: string, setAlert: Function, root: boolean }) => {
  return (
    <div
      className="w-full border px-4 py-3 rounded flex justify-between items-center cursor-pointer"
      onClick={() => setAlert(false)}
      style={{
        color: root ? "#15803d" : "#b91c1c",
        backgroundColor: root ? "#dcfce7" : "#fee2e2",
        borderColor: root ? "#4ade80" : "#f87171",
      }}
      role="alert"
    >
      <div>
        <strong className="font-bold">{bold}</strong>
        <span className="block sm:inline pl-2">{message}</span>
      </div>
      <span>
        <span className="text-2xl font-bold pb-4">&times;</span>
      </span>
    </div>
  )
}
