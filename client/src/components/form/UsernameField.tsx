import { useTsController } from "@ts-react/form";

export function UsernameField() {
  const {
    field: { onChange, value },
    error,
  } = useTsController<string>();

  return (
    <div className="mt-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</label>
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value ? value : ""}
        placeholder="Username"
        aria-labelledby="usernameinput"
        type="text"
        id="username"
        autoComplete="off"
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {error && error.errorMessage}
      </p>
    </div>
  );
}