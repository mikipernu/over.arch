import { createUniqueFieldSchema } from "@ts-react/form";
import { z } from "zod";

const UsernameSchema = createUniqueFieldSchema(
  z.string()
    .min(4, "Username has to include four or more characters")
    .max(20, "Username can be up to twenty characters"),
  "username"
);

export default UsernameSchema;
