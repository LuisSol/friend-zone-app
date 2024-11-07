"use client";
import { use } from "react";
import Image from "next/image";
import { trpc } from "@/server/client";
import styles from "./page.module.css";
import UsersShowcase from "@/components/UserShowcase";

export default function Profile({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const resolvedParams = use(params);
  const { userId } = resolvedParams;

  const { data: profileData, isLoading: isLoadingProfile } =
    trpc.user.getProfile.useQuery({
      userId,
    });
  const { data: friendsData, isLoading: isLoadingFriends } =
    trpc.user.getFriends.useQuery({
      userId,
    });

  const { name = "", profilePicture = "", friends = [] } = profileData || {};

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        {isLoadingProfile ? (
          <p>Loading...</p>
        ) : (
          <>
            <Image
              className={styles.profilePicture}
              src={profilePicture}
              width={130}
              height={130}
              alt={name}
            />
            <h2>{name}</h2>
            <h3>Fiends: {friends.length}</h3>
          </>
        )}
      </div>

      <UsersShowcase
        title="Friends"
        users={friendsData || []}
        isLoading={isLoadingFriends}
      />
    </div>
  );
}
