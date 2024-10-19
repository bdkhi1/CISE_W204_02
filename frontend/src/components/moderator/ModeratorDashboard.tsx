"use client";

import React from "react";
import styles from "../dashboard.module.scss";
import ModeratorTable from "./ModeratorTable/ModeratorTable"
const AnalystDashboard: React.FC = () => {
  return (
    <div className={styles.pageBackground}>
      <div className={styles.dashboardContainer}>        
        <h1 className={styles.dashboardTitle}>Moderator Dashboard</h1>
        <p className={styles.dashboardDesc}>
          Approve or Reject Articles based on their relevance
        </p>
        <ModeratorTable />
      </div>
    </div>
  );
};

export default AnalystDashboard;
