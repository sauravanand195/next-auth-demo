"use client"
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Container, FormControlLabel, FormGroup, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Step, StepContent, StepIcon, StepLabel, Stepper, TextField, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import LabelIcon from '@mui/icons-material/Label';
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import axios from "axios";
import { useState } from "react";
import TaskPopup from "./taskPopup";
import { CustomToolTip, stringAvatar } from "../../../../public/js/commonFun";
import Chip from '@mui/material/Chip';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentTurnedInSharpIcon from '@mui/icons-material/AssignmentTurnedInSharp';

const PlannerList = ({ todoData, fetchData }) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [selectedTask, setSelectedTask] = useState({})
    const [activeStep, setActiveStep] = useState(0)

    const updatestatus = async (val) => {
        try {
            const response = await axios.put('/api/todo', { id: val.id, task: val.task, description: val.description, priority: val.priority, status: (val.status == 'incomplete') ? 'complete' : 'incomplete' })
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
            case 'high': return 'error';
            case 'medium': return 'primary';
            case 'low': return 'success';
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete('/api/todo', { data: { id: id } })
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
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {todoData?.map((val, ind) => (
                    <ListItem alignItems="flex-start" sx={{ pb: 2 }}
                        secondaryAction={
                            <div style={{ position: "relative", right: "-16px", top: "50%", transform: "translateY(-50%)" }}>
                                <IconButton disabled={val.status == 'complete'} onClick={() => editTask(val)}><EditIcon /></IconButton>
                                <IconButton disabled={val.status == 'complete'} onClick={() => { deleteTask(val.id) }}><DeleteIcon /></IconButton>
                                <Tooltip placement='top-start' title={`${val.status == 'complete' ? 'Mark In-complete' : 'Mark Complete'}`} leaveDelay={200}>
                                    <Checkbox
                                        checked={val.status == 'complete'}
                                        onChange={() => updatestatus(val)}
                                        icon={<AssignmentTurnedInOutlinedIcon />}
                                        checkedIcon={<AssignmentTurnedInSharpIcon />}
                                    />
                                </Tooltip>
                            </div>
                        }
                        disablePadding
                    >
                        <ListItemAvatar>
                            <Avatar {...stringAvatar(val.task, '#9c409c', '17px')} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography sx={{ fontWeight: "bold", textDecoration: (val.status == 'complete') ? 'line-through' : '' }}>{val.task}</Typography>}
                            secondary={<>
                                <Typography sx={{ fontWeight: "normal", mb: 1 }}>{val.description}</Typography>
                                <Chip label={val.priority} size="small" color={getPCode(val.priority)} />
                            </>}
                        />
                        <div className="line"></div>
                    </ListItem>
                ))}
            </List >

            <style jsx>{`
                .line {top: 49px;left: 19px;height: 66px;position: absolute;border-left: 3px solid gray;}
            `}</style>
        </Container >
    );
}

export default PlannerList;