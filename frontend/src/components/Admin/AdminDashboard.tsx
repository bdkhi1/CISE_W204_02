'use client';
import React from 'react';
import SortableTable from './AdminTable/SortableTable';
import PopulatedNavBar from '../PopulatedNavBar';
import styles from './admin.module.scss';

interface AdminDashboardProps {
  onEdit: (articleId: string) => void;
  onDelete: (articleId: string) => void;
}

const AdminDashboard: React.FC = () => {
  const handleEdit = (articleId: string) => {
    console.log(`Editing article with ID: ${articleId}`);
  };

  const handleDelete = (articleId: string) => {
    console.log(`Deleting article with ID: ${articleId}`);
  };

  return (
    <>
      <PopulatedNavBar />
      
      <div className={styles.adminContainer}>
        <h1 className={styles.adminTitle}>Admin Dashboard</h1>
        <p className={styles.adminDesc}>Manage articles and monitor submissions.</p>

        {}
        <div className={styles.buttonContainer}>
          <button className={styles.btn} >Edit</button>
          <button className={`${styles.btn} ${styles.btnDanger}`}>Delete</button>
        </div>
        <SortableTable onEdit={handleEdit} onDelete={handleDelete} />

        {}
        
      </div>
    </>
  );
};

export default AdminDashboard;
