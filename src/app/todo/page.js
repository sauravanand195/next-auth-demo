"use client"
import { useEffect, useState } from 'react'
import { CssBaseline, Stack, Typography, Container, Box, Button } from '@mui/material';
import AddOutlined from '@mui/icons-material/AddOutlined';
import TaskCards from '../components/todo/taskCards';
import TaskPopup from '../components/todo/taskPopup';
import FooterTodo from '../components/todo/footerTodo';
import { CustomToolTip } from '../../../public/js/commonFun';

const Index = () => {
    const [open, setOpen] = useState(false)
    const [todoData, setTodoData] = useState([])

    const fetchData = async () => {
        const response = await fetch('/api/todo')
        console.log('response', response);
        const responseObj = await response.json()
        setTodoData(responseObj?.results)
    }

    useEffect(() => {
        const loadData = async () => {
            const response = await fetch('/api/todo')
            const responseObj = await response.json()
            setTodoData(responseObj?.results)
        }
        loadData()
    }, [])

    return (
        <div style={{ backgroundColor: "#FFFCF9" }}>
            <TaskPopup open={open} setOpen={setOpen} fetchData={fetchData} action="create" />
            <CssBaseline />
            <main style={{ minHeight: '78vh' }}>
                <Box sx={{ pt: 4 }}>
                    <Container maxWidth="md">
                        <Typography component="h2" variant="h5" align="center" color="text.primary" gutterBottom>
                            Organize your work and life, finally.
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            Maintain your day-to-day tasks or list everything that you have to do, with the most important tasks at the top of the list, and the least important tasks at the bottom.
                        </Typography>
                    </Container>
                </Box>
                <Stack sx={{ pt: 2, pb: 4 }} direction="row" justifyContent="center">
                    <CustomToolTip title="Click to create todo" arrow>
                        <Button onClick={() => setOpen(true)} variant="contained"><AddOutlined />&nbsp;Create Todo</Button>
                    </CustomToolTip>
                </Stack>
                <TaskCards todoData={todoData} fetchData={fetchData} />
            </main>
            <FooterTodo />
        </div>
    );
}

export default Index;