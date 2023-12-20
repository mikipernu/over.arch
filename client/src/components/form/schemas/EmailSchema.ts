import { createUniqueFieldSchema } from "@ts-react/form";
import { z } from "zod";

const EmailSchema = createUniqueFieldSchema(
  z.string().email("Enter a valid email."),
  "email"
);

export default EmailSchema;