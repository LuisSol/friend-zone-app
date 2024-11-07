import { BaseUser } from "@/types/user";
import XScrollableContentCard from "@/components/ui/XScrollableContent";

import UserCard from "../UserCard";
import styles from "./user-showcase.module.css";

export default function UsersShowcase({
  users,
  title,
  isLoading,
}: {
  users: BaseUser[] | null[];
  title: string;
  isLoading: boolean;
}) {
  return (
    <div className={styles.container}>
      <XScrollableContentCard title={title}>
        <div className={styles.cardGrid}>
          {isLoading ? (
            <p>...Loading</p>
          ) : (
            users.map((user) => user && <UserCard key={user.id} user={user} />)
          )}
        </div>
      </XScrollableContentCard>
    </div>
  );
}
