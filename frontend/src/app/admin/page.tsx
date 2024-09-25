'use client';

import React from 'react';
import AdminDashBoard from "@/components/Admin/AdminDashboard";
import styles from "@/components/Admin/admin.module.scss";

export default function AdminPage() {
  return (
    <main className={styles.pageBackground}>
      <AdminDashBoard />
    </main>
  );
}
