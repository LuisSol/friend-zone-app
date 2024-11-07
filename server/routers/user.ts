import userRepository from "@/server/repositories/UserRepository";
import { router, procedure } from "../trpc";
import { getUserData } from "../schemas/inputs";

export const userRouter = router({
  getUsers: procedure.query(async () => {
    return await userRepository.getUsers();
  }),
  getProfile: procedure.input(getUserData).query(async ({ input }) => {
    const { userId } = input;

    return await userRepository.getProfile(userId);
  }),
  getFriends: procedure.input(getUserData).query(async ({ input }) => {
    const { userId } = input;

    return await userRepository.getUserFriends(userId);
  }),
});
