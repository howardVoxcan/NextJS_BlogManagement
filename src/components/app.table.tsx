'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from '@mui/material';
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

  const handleAdd = () => {
    setMode('create');
    setSelectedBlog(null);
    setShowModal(true);
  };

  const handleEdit = (blog: IBlog) => {
    setMode('edit');
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleDelete = async (blog: IBlog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return;

    const res = await fetch(
      `http://localhost:8000/blogs/${blog.id}`,
      { method: 'DELETE' }
    );

    if (!res.ok) {
      toast.error('Delete failed');
      return;
    }

    toast.success('Blog deleted');
    mutate('http://localhost:8000/blogs');
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight={600}>
          Table Blogs
        </Typography>

        <Button variant="contained" color="success" onClick={handleAdd}>
          Add New Blog
        </Button>
      </Box>

      {/* ===== TABLE ===== */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell width={60}><b>#</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Author</b></TableCell>
              <TableCell><b>Content</b></TableCell>
              <TableCell width={160} align="center">
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {blogs.map((blog, index) => (
              <TableRow
                key={blog.id}
                sx={{
                  backgroundColor:
                    index % 2 === 0 ? 'grey.100' : 'grey.50',
                  transition: 'background-color 0.25s ease',
                  cursor: 'pointer',

                  '&:hover': {
                    backgroundColor: 'grey.200',
                  },

                  // Giữ button không bị đổi màu chữ
                  '&:hover td': {
                    color: 'text.primary',
                  },

                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.content}</TableCell>

                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(blog);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(blog);
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}

            {blogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No blogs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
