import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-medium text-white">Oops!</h1>
      <p className="text-gray-400">Sorry, an unexpected error has occurred.</p>
      <p>
      <i className="text-red-700">{(error as Error)?.message || (error as {statusText: string}).statusText}</i>
      </p>
    </div>
  );
}
