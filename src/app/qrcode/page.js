"use client"
import React from "react";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

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

    const downloadQRCode = () => {
        const canvas = document.getElementById('qrcode');
        const pngUrl = canvas?.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "QRCode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleRadioChange = (event) => {
        setSelection(event.target.value)
    }

    return (
        <>
            <FormControl fullWidth variant="standard" sx={{ p: 2 }}>
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
                <Button sx={{ mt: 1 }} disabled={selection == ''} size="small" variant="contained" onClick={() => { setShowQR(true) }}>
                    View
                </Button>
                <Button sx={{ mt: 1 }} disabled={selection == ''} size="small" variant="contained" onClick={downloadQRCode}>
                    Download
                </Button>
            </FormControl>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "80px" }}>
                {showQR && selection && <QRCodeCanvas bgColor={"#ffffff"} fgColor={"#000000"} includeMargin={true} id="qrcode" value={JSON.stringify(data[selection])} size={260} />}
            </div>
        </>
    );
}

export default Page;