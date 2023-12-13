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
import { CustomToolTip } from "../../../../public/js/commonFun";
import Chip from '@mui/material/Chip';

const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
];

const PlannerList = ({ todoData, fetchData }) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [selectedTask, setSelectedTask] = useState({})
    const [activeStep, setActiveStep] = useState(0)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const updatestatus = async (val) => {
        try {
            const response = await axios.put(`/api/todo`, { id: val.id, task: val.task, description: val.description, priority: val.priority, status: (val.status == 'incomplete') ? 'complete' : 'incomplete' })
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
            const response = await axios.delete(`/api/todo`, { data: { id: id } })
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
                <ListItem alignItems="flex-start" sx={{ pb: 2 }}
                    secondaryAction={
                        <>
                            <IconButton onClick={() => editTask(val)}><EditIcon /></IconButton>
                            <IconButton onClick={() => { deleteTask(val.id) }}><DeleteIcon /></IconButton>
                        </>
                    }
                    disablePadding
                >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography sx={{ fontWeight: "bold" }}>Brunch this weekend</Typography>}
                        secondary={<>
                            <Typography sx={{ fontWeight: "normal" }}>Brunch this weekend</Typography>
                            <Chip label="High" size="small" color="error" />
                        </>}
                    />
                    <div className="line"></div>
                </ListItem>
                <ListItem alignItems="flex-start"
                    secondaryAction={
                        <>
                            <IconButton onClick={() => editTask(val)}><EditIcon /></IconButton>
                            <IconButton onClick={() => { deleteTask(val.id) }}><DeleteIcon /></IconButton>
                        </>
                    }
                    disablePadding
                >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography sx={{ fontWeight: "bold" }}>Brunch this weekend</Typography>}
                        secondary={<>
                            <Typography sx={{ fontWeight: "normal" }}>Brunch this weekend</Typography>
                            <Chip label="Medium" size="small" color="primary" />
                        </>}
                    />
                    <div className="line"></div>
                </ListItem>
            </List>

            <style jsx>{`
                          .line {
                            top: 48px;
                            left: 19px;
                            height: 60px;
                            position: absolute;
                            border-left: 3px solid gray;
                          }
                    `}</style>
        </Container >
    );
}

export default PlannerList;