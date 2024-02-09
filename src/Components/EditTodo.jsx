import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const EditTodo = ({ todo, index }) => {
    const [show, setShow] = useState(false)
    const [editedText, setEditedText] = useState(todo.text)
    const [todos, setTodos] = useState([])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleUpdate = () => {
      const updatedTodos = [...todos]
      updatedTodos[index] = { ...updatedTodos[index], text: editedText }
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      setTodos(updatedTodos)
      handleClose()
    }

    useEffect(() => {
      setEditedText(todo.text)
    }, [todo.text])

    useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem('todos'));
      if (storedTodos) setTodos(storedTodos);
    }, []);

    return (
      <>
        <Button variant="outline-primary" onClick={handleShow}>🖊</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control type="text" rows={1} value={editedText} onChange={e => setEditedText(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate} disabled={editedText === todo.text}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    )
}

export default EditTodo