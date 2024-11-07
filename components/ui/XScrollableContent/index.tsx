import styles from "./xscrollable-content.module.css";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function XScrollableContentCard({ title, children }: CardProps) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      {children}
    </div>
  );
}
