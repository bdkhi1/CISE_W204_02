"use client";

import React from "react";
import styles from "../dashboard.module.scss";

const AnalystDashboard: React.FC = () => {
  return (
    <div className={styles.pageBackground}>
      <div className={styles.dashboardContainer}>
        <h1 className={styles.dashboardTitle}>Analyst Dashboard</h1>
        <p className={styles.dashboardDesc}>
          This is a description of the Analyst Dashboard.
        </p>
      </div>
    </div>
  );
};

export default AnalystDashboard;
