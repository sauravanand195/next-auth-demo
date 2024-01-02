"use client"
import { useEffect, useState } from 'react'
import { CssBaseline, Stack, Typography, Container, Box, Button, Fab } from '@mui/material';
import AddOutlined from '@mui/icons-material/AddOutlined';
import AddIcon from '@mui/icons-material/Add';
import TaskPopup from '../components/todo/taskPopup';
import { CustomToolTip } from '../../../public/js/commonFun';
import FilterDramaOutlinedIcon from '@mui/icons-material/FilterDramaOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import PlannerList from '../components/todo/plannerList';

const Index = () => {
    const [open, setOpen] = useState(false)
    const [todoData, setTodoData] = useState([])
    const [forecastData, setForecastData] = useState({})
    const [address, setAddress] = useState({})
    const [position, setPosition] = useState({ latitude: "", longitude: "" });

    const fetchData = async () => {
        const response = await fetch('/api/todo')
        const responseObj = await response.json()
        setTodoData(responseObj?.results)
    }

    useEffect(() => {
        window.history.scrollRestoration = 'manual';
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords
                setPosition({ latitude, longitude })
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);

    useEffect(() => {
        const loadData = async () => {
            const response = await fetch('/api/todo')
            const responseObj = await response.json()
            setTodoData(responseObj?.results)
        }
        loadData()
    }, [])

    useEffect(() => {
        const getForecast = async () => {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position?.latitude}&longitude=${position?.longitude}&current=temperature,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
            const responseObj = await response.text();
            responseObj && setForecastData(JSON.parse(responseObj))
        }
        getForecast()
        // 
        const getAddress = async () => {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position?.latitude}&longitude=${position?.longitude}&localityLanguage=en`);
            const responseObj = await response.json()
            responseObj && setAddress(responseObj)
        }
        getAddress()
    }, [position])

    console.log('forecastData', forecastData);
    console.log('address', address);

    return (
        <div style={{ backgroundColor: "#FFFCF9" }}>
            <TaskPopup open={open} setOpen={setOpen} fetchData={fetchData} action="create" />
            <CssBaseline />
            <main style={{ minHeight: '78vh' }}>
                <Stack sx={{ pt: 2, background: "linear-gradient(#e66465, #212a8d)" }} >
                    <Box sx={{ p: 2, flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: "space-between" }}>
                        <Typography variant="h6" noWrap component="a" sx={{ color: "#e9ecef", display: 'flex', alignItems: "center" }}>
                            Hi, Good Morning
                        </Typography>
                        <CustomToolTip title="Click to create todo" arrow>
                            <Fab onClick={() => setOpen(true)} sx={{ backgroundColor: "#70d6ff" }} aria-label="add" size='medium'>
                                <AddIcon />
                            </Fab>
                        </CustomToolTip>
                    </Box>
                    <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                        <Typography noWrap sx={{ color: "#e9ecef", display: "flex", alignItems: "center" }}>
                            <FilterDramaOutlinedIcon />
                        </Typography>
                        <Typography sx={{ color: "#e9ecef", fontSize: "45px" }}>
                            &nbsp;{forecastData?.current?.temperature}
                        </Typography>
                        <Typography sx={{ color: "#e9ecef", fontSize: "20px", height: "62px" }}>{forecastData?.current_units?.temperature}</Typography>
                    </Box>
                    <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                        <Typography noWrap sx={{ color: "#e9ecef", pl: 5, mt: "-55px" }}>
                            {address?.city}, {address?.principalSubdivision}
                        </Typography>
                    </Box>
                </Stack>
                <PlannerList todoData={todoData} fetchData={fetchData} />
            </main>
        </div>
    );
}

export default Index;