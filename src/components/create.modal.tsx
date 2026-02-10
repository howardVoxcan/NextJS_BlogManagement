'use client'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}

function CreateModal(props: IProps) {
    const {showModalCreate, setShowModalCreate} = props;

    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const handleSubmit = () => {
        fetch ('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                author: author,
                content: content
            })
        }).then(res => res.json())     
        .then(res => console.log("Check data response",res))

        if (title && author && content) {
            toast.success('Blog post created successfully!');
            handleClose();
        }
     
        // toast.success('Blog post created successfully!');
        // console.log("Title:", title);
        // console.log("Author:", author);
        // console.log("Content:", content);
    }

    const handleClose = () => {
        setShowModalCreate(false);
        setTitle('');
        setAuthor('');
        setContent('');
    }

    return (
    <>
        <Modal
            show={showModalCreate}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size = "lg"
        >
        <Modal.Header closeButton>
            <Modal.Title>Add New Blog Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Enter author" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={ () => handleClose()}>
            Close
            </Button>
            <Button variant="primary" onClick={ () => handleSubmit()}>
            Save
            </Button>
        </Modal.Footer>
        </Modal>
    </>
    );
    }

export default CreateModal;