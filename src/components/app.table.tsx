'use client'

import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';

interface IProps {
    blogs: IBlog[];
}

function AppTable(props: IProps) {
  return (
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
  );
}

export default AppTable;