"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { useState } from 'react';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useEffect } from 'react';

const prodData = {
    "Type of Cars:": [
        {
            "Hatchback": [
                {
                    "Select any Hatchback:": [
                        {
                            "car_name": "Maruti Suzuki Swift",
                            "price": "6.49 l"
                        },
                        {
                            "car_name": "Tata Altroz",
                            "price": "6.65 l"
                        },
                        {
                            "car_name": "Hyundai i20",
                            "price": "7.04 l"
                        }
                    ]
                }
            ]
        },
        {
            "Convertible": [
                {
                    "Select any Convertible:": [
                        {
                            "car_name": "BMW Z4",
                            "price": "90.90 l"
                        },
                        {
                            "car_name": "Aston Martin DB11",
                            "price": "3.29 cr"
                        },
                        {
                            "car_name": "Ferrari Portofino",
                            "price": "3.50 cr"
                        }
                    ]
                }
            ]
        },
        {
            "Sedan": [
                {
                    "Select any Sedan:": [
                        {
                            "car_name": "Hyundai Verna",
                            "price": "11 l"
                        },
                        {
                            "car_name": "Skoda Slavia",
                            "price": "11.63 l"
                        },
                        {
                            "car_name": "Volkswagen Virtus",
                            "price": "11.56 l"
                        }
                    ]
                }
            ]
        }
    ]
}

export default function BasicSelect() {
    const [openCalc, setOpenCalc] = useState(false)
    const [quesObj, setQuesObj] = useState({})

    useEffect(() => {
        setQuesObj(prodData)
    }, [])

    console.log('quesObj', quesObj);

    return (
        <Box sx={{ padding: 4, minWidth: 120 }}>
            <Button sx={{ mb: 2 }} variant="contained" onClick={() => { setOpenCalc(!openCalc) }} fullWidth>{openCalc ? 'Hide' : 'Show'} Calculator<CalculateIcon sx={{ ml: 2 }} /></Button>
            {openCalc && <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Question</InputLabel>
                    <Select
                        value=""
                        label="Question"
                    >
                        <MenuItem value="">Ten</MenuItem>
                    </Select>
                </FormControl>
            </Box>}
        </Box>
    );
}
