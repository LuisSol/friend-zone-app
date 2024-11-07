import { getDb } from "@/server/lib/mockDb/database";

import { BaseUser } from "@/types/user";

const repository = {
  async getUsers(): Promise<BaseUser[]> {
    const db = await getDb();

    const result = await db.findMany("users", {});

    return result;
  },

  async getProfile(userId: string): Promise<BaseUser | null> {
    const db = await getDb();

    const result = await db.findOne("users", { id: userId });

    return result;
  },

  async getUserFriends(userId: string): Promise<BaseUser[]> {
    const db = await getDb();
    const friendsData: BaseUser[] = [];

    const queryUser = await db.findOne("users", { id: userId });
    queryUser?.friends.forEach(async (friendId) => {
      const friendData = await db.findOne("users", { id: friendId });

      if (friendData) friendsData.push(friendData);
    });

    return friendsData;
  },
};

export default repository;
