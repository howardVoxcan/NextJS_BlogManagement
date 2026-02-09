'use client'

import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import { useState } from 'react';

interface IProps {
    blogs: IBlog[];
}

const AppTable = (props: IProps) => {
  const { blogs } = props;

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

  return (
    <>
      <div 
        className='mb-3'
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Table Blogs</h2>
        <Button variant='success' 
        onClick={() => setShowModalCreate(true)}
        >Add New Blog</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Author</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {props.blogs.map((blog, index) => {
            return (
              <tr key={blog.id}>
                <td>{index + 1}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.content}</td>
                <td>
                  <Button variant = 'primary'>View</Button>
                  <Button variant = 'warning'>Edit</Button>
                  <Button variant = 'danger'>Delete</Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
    </>
  );
}

export default AppTable;