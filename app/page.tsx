import FunctionTile from "./components/functionTile";
import styles from "./page.module.css";
import ApproveERC20 from "./components/ApproveERC20";
import Connect from "./components/Connect";
import RevokeApproval from "./components/RevokeApproval";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>interact with each tile to test a piece of wallet functionality</p>
      </div>

      <div className={styles.grid}>
        <Connect />
        <ApproveERC20 />
        <RevokeApproval />
      </div>
    </main>
  );
}
