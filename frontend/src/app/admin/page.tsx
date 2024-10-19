"use client";

import React from "react";
import BasicTable from "@/components/Table/BasicTable";
import PopulatedNavBar from "@/components/PopulatedNavBar";
import styles from "@/components/dashboard.module.scss";

export default function AdminPage() {
  return (
    <div className={styles.pageBackground}>
      <PopulatedNavBar />
      <div className={styles.dashboardContainer}>
        <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
        <BasicTable />
      </div>{" "}
    </div>
  );
}
