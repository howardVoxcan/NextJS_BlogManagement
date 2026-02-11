'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

interface IProps {
  show: boolean
  setShow: (v: boolean) => void
  mode: 'create' | 'edit'
  selectedBlog?: IBlog | null
}

const BlogModal = ({ show, setShow, mode, selectedBlog }: IProps) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  // ===== Fill data when edit =====
  useEffect(() => {
    if (mode === 'edit' && selectedBlog) {
      setTitle(selectedBlog.title)
      setAuthor(selectedBlog.author)
      setContent(selectedBlog.content)
    }

    if (mode === 'create') {
      setTitle('')
      setAuthor('')
      setContent('')
    }
  }, [mode, selectedBlog])

  // ===== Close on ESC =====
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [setShow])

  const handleClose = () => setShow(false)

  const handleSubmit = async () => {
    if (!title || !author || !content) {
      toast.error('Please fill all fields')
      return
    }

    const url =
      mode === 'create'
        ? 'http://localhost:8000/blogs'
        : `http://localhost:8000/blogs/${selectedBlog?.id}`

    const method = mode === 'create' ? 'POST' : 'PUT'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, content }),
    })

    if (!res.ok) {
      toast.error('Something went wrong')
      return
    }

    toast.success(
      mode === 'create'
        ? 'Blog created successfully!'
        : 'Blog updated successfully!'
    )

    mutate('http://localhost:8000/blogs')
    handleClose()
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-xl p-6 animate-fadeIn">

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">
          {mode === 'create' ? 'Add New Blog' : 'Edit Blog'}
        </h2>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Author"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <textarea
            rows={4}
            placeholder="Content"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-lg text-white transition ${
              mode === 'create'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            {mode === 'create' ? 'Save' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogModal
