'use client'

import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import BlogModal from './create.modal';

interface IProps {
  blogs: IBlog[];
}

const AppTable = ({ blogs }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

  // ===== CREATE =====
  const handleAdd = () => {
    setMode('create');
    setSelectedBlog(null);
    setShowModal(true);
  };

  // ===== EDIT =====
  const handleEdit = (blog: IBlog) => {
    setMode('edit');
    setSelectedBlog(blog);
    setShowModal(true);
  };

  // ===== DELETE =====
  const handleDelete = async (blog: IBlog) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );

    if (!confirmDelete) return;

    const res = await fetch(
      `http://localhost:8000/blogs/${blog.id}`,
      { method: 'DELETE' }
    );

    if (!res.ok) {
      toast.error('Delete failed');
      return;
    }

    toast.success('Blog deleted successfully');
    mutate('http://localhost:8000/blogs');
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <div
        className="mb-3"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Table Blogs</h2>
        <Button variant="success" onClick={handleAdd}>
          Add New Blog
        </Button>
      </div>

      {/* ===== TABLE ===== */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: 60 }}>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Content</th>
            <th style={{ width: 150 }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.id}>
              <td className="align-middle">{index + 1}</td>
              <td className="align-middle">{blog.title}</td>
              <td className="align-middle">{blog.author}</td>
              <td className="align-middle">{blog.content}</td>

              {/* ===== ACTION COLUMN (FIX FULL HEIGHT) ===== */}
              <td className="align-middle">
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(blog)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ===== MODAL ===== */}
      <BlogModal
        show={showModal}
        setShow={setShowModal}
        mode={mode}
        selectedBlog={selectedBlog}
      />
    </>
  );
};

export default AppTable;
