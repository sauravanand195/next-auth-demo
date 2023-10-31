"use client"
import { Button } from "@mui/material"
import { getTodo } from "./actions/todo/getTodo"

export default function Home() {
  const handleSubmit = async () => {
    const res = await getTodo()
    console.log('res', res);
  }

  return (
    <div>
      Home Page
      <Button onClick={() => handleSubmit()}>
        Get Todo
      </Button>
    </div>
  )
}
