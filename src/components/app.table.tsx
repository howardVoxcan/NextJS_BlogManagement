'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import BlogModal from './create.modal'

interface IProps {
  blogs: IBlog[]
}

const AppTable = ({ blogs }: IProps) => {
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null)

  const handleAdd = () => {
    setMode('create')
    setSelectedBlog(null)
    setShowModal(true)
  }

  const handleEdit = (blog: IBlog) => {
    setMode('edit')
    setSelectedBlog(blog)
    setShowModal(true)
  }

  const handleDelete = async (blog: IBlog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return

    const res = await fetch(
      `http://localhost:8000/blogs/${blog.id}`,
      { method: 'DELETE' }
    )

    if (!res.ok) {
      toast.error('Delete failed')
      return
    }

    toast.success('Blog deleted')
    mutate('http://localhost:8000/blogs')
  }

  return (
    <>
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">
          Table Blogs
        </h2>

        <button
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl transition shadow-md"
        >
          Add New Blog
        </button>
      </div>

      {/* ===== TABLE WRAPPER ===== */}
      <div className="bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-neutral-200">
            
            {/* ===== HEAD ===== */}
            <thead className="bg-neutral-800 text-neutral-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 w-16">#</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Content</th>
                <th className="px-6 py-4 w-40 text-center">Action</th>
              </tr>
            </thead>

            {/* ===== BODY ===== */}
            <tbody>
              {blogs.map((blog, index) => (
                <tr
                  key={blog.id}
                  className="
                    border-t border-neutral-800
                    hover:bg-neutral-800/60
                    transition
                  "
                >
                  <td className="px-6 py-4 text-neutral-400">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium text-white">
                    {blog.title}
                  </td>

                  <td className="px-6 py-4 text-neutral-300">
                    {blog.author}
                  </td>

                  <td className="px-6 py-4 max-w-xs truncate text-neutral-400">
                    {blog.content}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(blog)
                        }}
                        className="
                          text-yellow-400 
                          border border-yellow-500/40
                          hover:bg-yellow-500/10
                          px-3 py-1.5 
                          rounded-lg 
                          text-xs 
                          transition
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(blog)
                        }}
                        className="
                          text-red-400 
                          border border-red-500/40
                          hover:bg-red-500/10
                          px-3 py-1.5 
                          rounded-lg 
                          text-xs 
                          transition
                        "
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

              {blogs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-neutral-500"
                  >
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BlogModal
        show={showModal}
        setShow={setShowModal}
        mode={mode}
        selectedBlog={selectedBlog}
      />
    </>
  )
}

export default AppTable
