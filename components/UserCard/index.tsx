import Image from "next/image";
import Link from "next/link";

import { BaseUser } from "@/types/user";
import styles from "./user-card.module.css";

export default function UserCard({ user }: { user: BaseUser }) {
  return (
    <Link href={`/user/${user.id}`}>
      <div className={styles.container}>
        <Image
          src={user.profilePicture}
          alt={user.name}
          width={150}
          height={150}
        />
        <h4>{user.name}</h4>
        friends: <b>{user.friends.length}</b>
      </div>
    </Link>
  );
}
