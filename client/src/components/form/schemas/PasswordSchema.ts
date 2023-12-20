import { createUniqueFieldSchema } from "@ts-react/form";
import { z } from "zod";

const PasswordSchema = createUniqueFieldSchema(
  z.string()
    .min(8, "Password has to include eight characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  "password"
);

export default PasswordSchema;
