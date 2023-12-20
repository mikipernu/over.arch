import { useTsController } from "@ts-react/form";

export function TextField() {
  const {
    field: { onChange, value },
    error,
  } = useTsController<string>();

  return (
    <>
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value ? value : ""}
        type="text"
      />
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {error && error.errorMessage}
      </p>
    </>
  );
}