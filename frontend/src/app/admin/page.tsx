'use client';

import React from 'react';
import BasicTable from '@/components/Table/BasicTable';
import PopulatedNavBar from '@/components/PopulatedNavBar';
import styles from "@/components/dashboard.module.scss";

export default function AdminPage() {
  return (
    <main className={styles.pageBackground}>
      <PopulatedNavBar />
      <BasicTable />
    </main>
  );
}
