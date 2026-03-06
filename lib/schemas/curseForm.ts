import { z } from "zod";

export const curseFormSchema = z.object({
  name: z.string(),
});
