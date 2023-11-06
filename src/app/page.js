"use client"
import { Button } from "@mui/material"
import axios from "axios";

export default function Home() {
  const getTodo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todo')
      console.log('response', response);
    } catch (err) {
      console.log('err', err);
    }
  }

  const createTodo = async () => {
    const json = {
      task: 'Testfdzgnzk',
      description: 'Test',
      status: 'Test',
      priority: 'Test',
    }
    try {
      const res = await axios.post(`http://localhost:3000/api/todo`, json)
      console.log('res', res);
    } catch (err) {
      console.log('err', err);
    }
  }
  const updateTodo = async () => {
    const val = {
      id: 3,
      task: 'Saurav',
      description: 'Anand',
      status: 'Test',
      priority: 'Test',
    }
    try {
      const res = await axios.put(`http://localhost:3000/api/todo`, {
        id: val.id,
        task: val.task,
        description: val.description,
        priority: val.priority,
        status: val.status
      })
      console.log('response', res);
    } catch (err) {
      console.log('err', err);
    }
  }

  const deleteTodo = async () => {
    const val = { id: 3, }
    try {
      const res = await axios.delete(`http://localhost:3000/api/todo`, { data: { id: val.id } })
      console.log('response', res);
    } catch (err) {
      console.log('err', err);
    }
  }



  return (
    <div>
      Home Page
      <Button onClick={() => getTodo()}>
        Get Todo
      </Button>
      <Button onClick={() => createTodo()}>
        Create Todo
      </Button>
      <Button onClick={() => updateTodo()}>
        Update Todo
      </Button>
      <Button onClick={() => deleteTodo()}>
        Delete Todo
      </Button>
    </div>
  )
}
