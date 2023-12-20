import { useTsController } from "@ts-react/form";

export function PasswordField() {
  const {
    field: { onChange, value },
    error,
  } = useTsController<string>();

  return (
    <div className="w-100 mt-4 col-span-6 sm:col-span-3">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value ? value : ""}
        placeholder="Password"
        aria-labelledby="passwordinput"
        type="password"
        id="password"
        autoComplete="off"
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {error && error.errorMessage}
      </p>
    </div>
  );
}