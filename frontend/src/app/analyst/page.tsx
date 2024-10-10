'use client';

import React from 'react';
import AnalystDashboard from "@/components/analyst/AnalystDashboard";
import styles from "@/components/dashboard.module.scss";
import PopulatedNavBar from '@/components/PopulatedNavBar';

export default function AnalystPage() {
  return (
    <main className={styles.pageBackground}>
      <PopulatedNavBar />
      <AnalystDashboard />
    </main>
  );
}
