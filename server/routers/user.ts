import { router, procedure } from "../trpc";
import { getUserData } from "../schemas/inputs";

export const userRouter = router({
  getUsers: procedure.query(async () => {
    // TODO All users
    return [];
  }),
  getProfile: procedure.input(getUserData).query(async ({ input }) => {
    const {
      /* userId */
    } = input;
    //TODO sent a profile
    return {};
  }),
  getFriends: procedure.input(getUserData).query(async ({ input }) => {
    const {
      /* userId */
    } = input;
    // TODO get de user friends
    return [];
  }),
});
