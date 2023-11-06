"use client"
import { Box, Card, CardActions, CardContent, CardHeader, Checkbox, Container, FormControlLabel, FormGroup, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import LabelIcon from '@mui/icons-material/Label';
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import axios from "axios";
import { useState } from "react";
import TaskPopup from "./taskPopup";
import { CustomToolTip } from "../../../public/js/commonFun";

const TaskCards = ({ todoData, fetchData }) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [selectedTask, setSelectedTask] = useState({})

    const updatestatus = async (val) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/todo`, { id: val.id, task: val.task, description: val.description, priority: val.priority, status: (val.status == 'incomplete') ? 'complete' : 'incomplete' })
            if (response?.data?.status == true) {
                console.log('Data updated successfully')
                fetchData()
            } else { console.log('Error msg', response?.data?.message) }
        } catch (err) {
            console.log('Error :>> ', err);
        }
    }

    const getPCode = (val) => {
        switch (val) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'blue';
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/todo`, { data: { id: id } })
            if (response?.data?.status == true) {
                console.log('Data deleted successfully')
                fetchData()
            } else { console.log('Error msg', response?.data?.message) }
        } catch (err) {
            console.log('Error :>> ', err);
        }
    }

    const editTask = (val) => {
        setOpenPopup(true)
        setSelectedTask(val)
    }

    return (
        <Container maxWidth="lg">
            {openPopup && <TaskPopup open={openPopup} setOpen={setOpenPopup} fetchData={fetchData} selectedTask={selectedTask} action="update" />}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', pb: 6 }}>
                <SearchIcon color="primary" sx={{ mr: 1, my: 0.5 }} />
                <TextField fullWidth id="input-with-sx" label="Search your task" variant="standard" />
            </Box>
            <Grid container spacing={4}>
                {todoData?.map((val, ind) => (
                    <Grid item key={ind} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: (val.status == 'complete') ? 'lightgray' : '' }}
                        >
                            <CardHeader
                                action={
                                    <IconButton>
                                        <CustomToolTip placement="top" arrow title={val.priority} leaveDelay={500}>
                                            <BookmarksIcon sx={{ color: getPCode(val.priority) }} />
                                        </CustomToolTip>
                                    </IconButton>
                                }
                                title={<FormGroup>
                                    <Tooltip placement='top-start' title={`${val.status == 'complete' ? 'Mark In-complete' : 'Mark Complete'}`} leaveDelay={200}>
                                        <FormControlLabel control={<Checkbox
                                            checked={val.status == 'complete'}
                                            onChange={() => updatestatus(val)}
                                            icon={<LabelOutlinedIcon />}
                                            checkedIcon={<LabelIcon />}
                                        />} label={val.task} />
                                    </Tooltip>
                                </FormGroup>}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography>{val.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => editTask(val)}><EditIcon /></IconButton>
                                <IconButton onClick={() => { deleteTask(val.id) }}><DeleteIcon /></IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container >
    );
}

export default TaskCards;