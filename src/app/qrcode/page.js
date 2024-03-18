"use client"
import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import QRCode from "react-qr-code";

const Page = () => {
    const [selection, setSelection] = useState('')
    const [showQR, setShowQR] = useState(false)
    const tStamp = moment().format('D-M-YYYY H:m:s')
    const data = {
        "Saurav": {
            "name": "Saurav Anand",
            "empcode": "10134979",
            "date": tStamp
        },
        "Viraj": {
            "name": "Viraj Mahendra joshi",
            "empcode": "10134978",
            "date": tStamp
        },
        "Anvesh": {
            "name": "Anvesh Poda",
            "empcode": "10109177",
            "date": tStamp
        },
        "Rudresh": {
            "name": "Rudresha Ms",
            "empcode": "10108889",
            "date": tStamp
        }
    }

    const handleRadioChange = (event) => {
        setSelection(event.target.value)
    }

    return (
        <div>
            <FormControl sx={{ m: 3 }} variant="standard">
                <FormLabel >Select any one to generate ...</FormLabel>
                <RadioGroup
                    value={selection}
                    onChange={handleRadioChange}
                >
                    {Object.keys(data).map((val, ind) => {
                        return (
                            <FormControlLabel key={ind} value={val} control={<Radio />} label={val} />
                        )
                    })}
                </RadioGroup>
                <Button sx={{ mt: 1, mr: 1 }} variant="outlined" onClick={() => { setShowQR(true) }}>
                    View
                </Button>
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                    Download
                </Button>
            </FormControl>
            <div style={{ padding: "77px" }}>
                {showQR && selection && <QRCode value={JSON.stringify(data[selection])} />}
            </div>
        </div>
    );
}

export default Page;