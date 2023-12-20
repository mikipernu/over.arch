import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const isErrorWithMessage = (value: unknown): value is { message: string } => {
    return typeof value === 'object' && value !== null && 'message' in value;
  };

  const hasStatusText = (value: unknown): value is { statusText: string } => {
    return typeof value === 'object' && value !== null && 'statusText' in value;
  };

  const errorMessage = isErrorWithMessage(error) ? error.message : hasStatusText(error) ? error.statusText : "An unexpected error has occurred";

  return (
    <div id="error-page">
      <p>An unexpected error has occurred.</p>
      <i>{errorMessage}</i>
    </div>
  );
}
