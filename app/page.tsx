"use client";
import UserShowcase from "@/components/UserShowcase";
import { trpc } from "@/server/client";
import styles from "./page.module.css";

export default function Home() {
  const { data: users, isLoading } = trpc.user.getUsers.useQuery();

  return (
    <main className={styles.main}>
      <UserShowcase
        title="All users"
        users={users || []}
        isLoading={isLoading}
      />
    </main>
  );
}
