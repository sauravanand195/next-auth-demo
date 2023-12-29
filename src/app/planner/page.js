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
                    {/* <Stack sx={{ pt: 2, pb: 4, background: "linear-gradient(#a065c7, #7209b7)" }} > */}
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
                    {/* <div className="calslots calTab_outer wrapper-flex">
                        <div className="calslotitem">
                            <div style={{ color: "#fff" }}>Mon</div>
                            <div style={{ color: "#fff" }}>01</div>
                        </div>
                        <div className="calslotitem">
                            <div style={{ color: "#fff" }}>Tue</div>
                            <div style={{ color: "#fff" }}>02</div>
                        </div>
                        <div className="calslotitem active">
                            <div style={{ color: "#fff" }}>Wed</div>
                            <div style={{ color: "#fff" }}>03</div>
                        </div>
                        <div className="calslotitem">
                            <div style={{ color: "#fff" }}>Thu</div>
                            <div style={{ color: "#fff" }}>04</div>
                        </div>
                        <div className="calslotitem">
                            <div style={{ color: "#fff" }}>Fri</div>
                            <div style={{ color: "#fff" }}>05</div>
                        </div>
                        <div className="calslotitem">
                            <div style={{ color: "#fff" }}>Sat</div>
                            <div style={{ color: "#fff" }}>06</div>
                        </div>
                        <div className="calslotitem">
                            <div style={{ color: "#fff" }}>Sun</div>
                            <div style={{ color: "#fff" }}>07</div>
                        </div>
                    </div> */}
                </Stack>
                <PlannerList todoData={todoData} fetchData={fetchData} />
            </main>
            <style jsx>{`
                .calslots.calTab_outer{overflow-x: scroll; overflow-y: hidden; position:relative;background-color:#e1bbbb1f;}
                .calslots.calTab_outer .calslotitem{border:0; width:auto; white-space: nowrap;position: relative;padding:10px 15px;fontSize:14px; text-align: center;}
                .calslots.calTab_outer .active{box-shadow: 0px 10px 15px 0px #e66465; font-size: 15px !important;}
                .wrapper-flex{display:flex;width:100%;}
                .calslotitem{width:70px;border-radius:4px;border:solid 1px #d4dbe0;display:inline-block;margin-right:13px;padding:5px 0;}
                .text-center{text-align: center;}
            `}</style>
        </div>
    );
}

export default Index;