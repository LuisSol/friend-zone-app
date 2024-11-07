import { z } from "zod";

export const getUserData = z.object({
  userId: z.string(),
});

export type GetUserDataInput = z.infer<typeof getUserData>;
