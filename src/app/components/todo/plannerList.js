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
import { BASE_API_URL } from "@/utils/constants";

const PlannerList = ({ todoData, fetchData }) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [selectedTask, setSelectedTask] = useState({})
    const [activeStep, setActiveStep] = useState(0)

    const updatestatus = async (val) => {
        try {
            const response = await axios.put(`${BASE_API_URL}/api/todo`, { id: val.id, task: val.task, description: val.description, priority: val.priority, status: (val.status == 'incomplete') ? 'complete' : 'incomplete' })
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
            const response = await axios.delete(`${BASE_API_URL}/api/todo`, { data: { id: id } })
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
        <Container maxWidth="lg" sx={{ padding: "10px 10px" }}>
            {openPopup && <TaskPopup open={openPopup} setOpen={setOpenPopup} fetchData={fetchData} selectedTask={selectedTask} action="update" />}

            {/* <Grid container spacing={4}>
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
            </Grid> */}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todoData?.map((val, ind) => (
                    <ListItem alignItems="flex-start" sx={{ pb: 2 }}
                        secondaryAction={
                            <div style={{ marginTop: "-40px", marginRight: "-30px" }}>
                                <IconButton onClick={() => editTask(val)}><EditIcon /></IconButton>
                                <IconButton onClick={() => { deleteTask(val.id) }}><DeleteIcon /></IconButton>
                            </div>
                        }
                        disablePadding
                    >
                        <ListItemAvatar>
                            <Avatar {...stringAvatar(val.task, '#9c409c', '17px')} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography sx={{ fontWeight: "bold" }}>{val.task}</Typography>}
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