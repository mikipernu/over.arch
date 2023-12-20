import { createTsForm } from "@ts-react/form";
import { ReactElement } from "react";
import Button from "./Button";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { UsernameField } from "./UsernameField";
import EmailSchema from "./schemas/EmailSchema";
import PasswordSchema from "./schemas/PasswordSchema";
import UsernameSchema from "./schemas/UsernameSchema";

const mapping = [
  [EmailSchema, EmailField],
  [PasswordSchema, PasswordField],
  [UsernameSchema, UsernameField]
] as const;

function FormContainer({
  onSubmit,
  children,
  loading,
}: {
  onSubmit: () => void;
  children: ReactElement;
  loading?: boolean;
}) {
  return (
    <form className="" onSubmit={onSubmit}>
      {children}
      <div className="mt-4 col-span-6 sm:flex sm:items-center sm:gap-4">
        <Button className="w-full" type="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </form>
  );
}

const TypeSafeForm = createTsForm(mapping, { FormComponent: FormContainer });

export default TypeSafeForm;