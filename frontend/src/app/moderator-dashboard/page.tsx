'use client';

import React from 'react';
import ModeratorDashboard from "@/components/moderator/ModeratorDashboard";
import styles from "@/components/dashboard.module.scss";
import PopulatedNavBar from '@/components/PopulatedNavBar';

export default function ModeratorPage() {
  return (
    <main className={styles.pageBackground}>
      <PopulatedNavBar />
      <ModeratorDashboard />
    </main>
  );
}
