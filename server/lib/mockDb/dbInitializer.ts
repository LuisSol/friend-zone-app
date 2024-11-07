import { getDb } from "./database";
import { faker } from "@faker-js/faker";

interface User {
  id: string;
  name: string;
  profilePicture: string;
  friends: string[];
}

const TOTAL_USERS = 100;

async function generateUsers(): Promise<User[]> {
  const userIds = Array.from({ length: TOTAL_USERS }, () =>
    faker.string.uuid()
  );

  const users: User[] = userIds.map((id) => {
    const numberOfFriends = faker.number.int({ min: 3, max: 7 });

    const possibleFriends = userIds.filter((friendId) => friendId !== id);
    const friends = faker.helpers.arrayElements(
      possibleFriends,
      numberOfFriends
    );

    return {
      id,
      name: faker.person.fullName(),
      profilePicture: `https://i.pravatar.cc/150?img=${faker.number.int({
        min: 1,
        max: 70,
      })}`,
      friends,
    };
  });

  return users;
}

async function initializeDatabase() {
  try {
    const db = await getDb();

    const users = await generateUsers();

    for (const user of users) {
      await db.create("users", user);
    }

    console.log(`Successfully initialized database with ${TOTAL_USERS} users`);
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export { initializeDatabase };
