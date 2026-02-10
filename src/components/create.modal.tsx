'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  show: boolean;
  setShow: (v: boolean) => void;
  mode: 'create' | 'edit';
  selectedBlog?: IBlog | null;
}

const BlogModal = ({ show, setShow, mode, selectedBlog }: IProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // ===== Fill data when edit =====
  useEffect(() => {
    if (mode === 'edit' && selectedBlog) {
      setTitle(selectedBlog.title);
      setAuthor(selectedBlog.author);
      setContent(selectedBlog.content);
    }

    if (mode === 'create') {
      setTitle('');
      setAuthor('');
      setContent('');
    }
  }, [mode, selectedBlog]);

  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    if (!title || !author || !content) {
      toast.error('Please fill all fields');
      return;
    }

    const url =
      mode === 'create'
        ? 'http://localhost:8000/blogs'
        : `http://localhost:8000/blogs/${selectedBlog?.id}`;

    const method = mode === 'create' ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, content }),
    });

    if (!res.ok) {
      toast.error('Something went wrong');
      return;
    }

    toast.success(
      mode === 'create'
        ? 'Blog created successfully!'
        : 'Blog updated successfully!'
    );

    mutate('http://localhost:8000/blogs');
    handleClose();
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundColor: 'grey.50',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>
        {mode === 'create' ? 'Add New Blog' : 'Edit Blog'}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Author"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>

        <Button
          variant="contained"
          color={mode === 'create' ? 'success' : 'warning'}
          onClick={handleSubmit}
        >
          {mode === 'create' ? 'Save' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlogModal;
