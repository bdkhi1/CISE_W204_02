"use client";

import React from "react";
import styles from "../dashboard.module.scss";
import AnalystTable from "./AnalystTable/AnalystTable";
const AnalystDashboard: React.FC = () => {
  return (
    <div className={styles.pageBackground}>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.dashboardTitle}>Analyst Dashboard</h1>
        <p className={styles.dashboardDesc}>
          Approve or Reject Articles based on their relevance
        </p>
        <AnalystTable />
      </div>
    </div>
  );
};

export default AnalystDashboard;
