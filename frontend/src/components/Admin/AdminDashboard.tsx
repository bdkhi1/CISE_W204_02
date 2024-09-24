'use client';
import React from 'react';
import AdminTable from "@/components/Tables/AdminTable/SortableTable";

export default function AdminDashboard() {
  const handleEdit = (articleId) => {

    console.log(`Editing article with ID: ${articleId}`);
  };

  const handleDelete = (articleId) => {

    console.log(`Deleting article with ID: ${articleId}`);
  };

  return (
    <main>
      <div className="admin-container">
        <h1 className='AdminTitle'>Admin Dashboard</h1>
        <p className='AdminDesc'>Manage articles and monitor submissions.</p>

        <AdminTable onEdit={handleEdit} onDelete={handleDelete} />

        {/* Button Container */}
        <div className="button-container flex justify-center mt-4">
          <button 
            className="btn mr-4" 
            onClick={() => handleEdit(/* Pass the article ID here */)}
          >
            Edit Article
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => handleDelete(/* Pass the article ID here */)}
          >
            Delete Article
          </button>
        </div>
      </div>
    </main>
  );
}