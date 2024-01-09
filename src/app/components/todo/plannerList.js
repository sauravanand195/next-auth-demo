"use client"
import { Avatar, Box, Checkbox, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TaskPopup from "./taskPopup";
import { stringAvatar } from "../../../../public/js/commonFun";
import Chip from '@mui/material/Chip';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentTurnedInSharpIcon from '@mui/icons-material/AssignmentTurnedInSharp';

const PlannerList = ({ todoData, fetchData }) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [selectedTask, setSelectedTask] = useState({})
    const todayRef = useRef(null);

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

    useEffect(() => {
        // Scroll into view when the component mounts
        if (todayRef.current) {
            todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, []);

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

    const getMonthDates = () => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const monthDates = [];
        for (let i = 0; i < 30; i++) {
            const date = new Date(startOfMonth);
            date.setDate(startOfMonth.getDate() + i);
            monthDates.push(date);
        }

        return monthDates;
    };

    return (
        <Container maxWidth="lg">
            {openPopup && <TaskPopup open={openPopup} setOpen={setOpenPopup} fetchData={fetchData} selectedTask={selectedTask} action="update" />}
            {/* Horizontal Scrollable Monthly Calendar */}
            <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginBottom: '16px' }}>
                {getMonthDates().map((date, index) => (
                    <div
                        key={index}
                        ref={date.toDateString() === new Date().toDateString() ? todayRef : null}
                        style={{
                            display: 'inline-block',
                            minWidth: '120px',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            marginRight: '8px',
                            backgroundColor: date.toDateString() === new Date().toDateString() ? '#87CEEB' : 'transparent',
                            transition: 'background-color 0.3s ease-in-out',
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</Typography>
                        <Typography>{date.toLocaleDateString('en-US', { day: 'numeric' })}</Typography>
                    </div>
                ))}
            </div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {todoData?.map((val, ind) => (
                    <ListItem key={ind} alignItems="flex-start" sx={{ pb: 2 }}
                        secondaryAction={
                            <Box style={{ position: "relative", right: "-16px", top: "50%", transform: "translateY(-50%)" }}>
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
                            </Box>
                        }
                        disablePadding
                    >
                        <ListItemAvatar>
                            <Avatar {...stringAvatar(val.task, '#9c409c', '17px')} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography sx={{ fontWeight: "bold", textDecoration: (val.status == 'complete') ? 'line-through' : '' }}>{val.task}</Typography>}
                            secondary={<span style={{ display: "flex", flexDirection: "column" }}>
                                <Typography component="span" sx={{ fontWeight: "normal", mb: 1 }}>{val.description}</Typography>
                                <Chip component="span" label={val.priority} size="small" color={getPCode(val.priority)} sx={{ width: "80px" }} />
                            </span>}
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