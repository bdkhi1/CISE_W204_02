'use client';

import React from 'react';
import ShowAdminArticles from "@/components/Admin/AdminArticleList";

export default function AdminDashboard() {
  return (
    <main>
      <h1>Admin Dashboard</h1>
      <ShowAdminArticles />
    </main>
  );
}