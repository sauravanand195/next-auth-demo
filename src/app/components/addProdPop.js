import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const AddProdPop = ({ open, setOpen, selectedProd }) => {
    const [inputData, setInputData] = useState({
        pname: selectedProd ? selectedProd.name : "",
        pdesc: selectedProd ? selectedProd.description : "",
        pcontent: selectedProd ? selectedProd.content : "",
        paction: selectedProd ? selectedProd.action : "",
        proute: selectedProd ? selectedProd.route : "",
        purl: selectedProd ? selectedProd.pic : "",
    })

    console.log('selectedProd', selectedProd);

    const handleInputChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        const paramsToPass = { ...inputData }
        console.log('paramsToPass', paramsToPass);
        try {
            const response = await axios.post('/api/products', paramsToPass)
            console.log('response', response);
            if (response?.data?.status == true) {
                console.log('Product added successfully')
            } else { console.log('Error msg', response?.data?.message) }
        } catch (err) {
            console.log('Error :>> ', err);
        }
    }

    const updateTask = async () => {
        try {
            const response = await axios.put('/api/todo', { ...inputData, status: "incomplete", id: selectedTask.id })
            if (response?.data?.status == true) {
                console.log('Data updated successfully')
                handleClose()
                fetchData()
            } else { console.log('Error msg', response?.data?.message) }
        } catch (err) {
            console.log('Error :>> ', err);
        }
    }

    return (
        <div>
            <Dialog maxWidth="lg" open={open} onClose={() => { setOpen(false) }}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        All the fields are mandatory to create new product template.
                    </DialogContentText>
                    <TextField autoFocus margin="dense" fullWidth variant="standard" name="pname" type="text"
                        label="Product Name"
                        value={inputData.pname}
                        onChange={(e) => { handleInputChange(e) }}
                    />
                    <TextField autoFocus margin="dense" fullWidth variant="standard" name="pdesc" type="text"
                        label="Product Descripton"
                        value={inputData.pdesc}
                        onChange={(e) => { handleInputChange(e) }}
                    />
                    <TextField autoFocus margin="dense" fullWidth variant="standard" rows={4} name="pcontent" multiline
                        label="Product Content"
                        value={inputData.pcontent}
                        onChange={(e) => { handleInputChange(e) }}
                    />
                    <TextField autoFocus margin="dense" fullWidth variant="standard" name="paction" type="text"
                        label="Product Action"
                        value={inputData.paction}
                        onChange={(e) => { handleInputChange(e) }}
                    />
                    <TextField autoFocus margin="dense" fullWidth variant="standard" name="proute" type="text"
                        label="Product Route"
                        value={inputData.proute}
                        onChange={(e) => { handleInputChange(e) }}
                    />
                    <TextField autoFocus margin="dense" fullWidth variant="standard" name="purl" type="text"
                        label="Product Image Url"
                        value={inputData.purl}
                        onChange={(e) => { handleInputChange(e) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => { handleSubmit() }}>Add</Button>
                    <Button variant="outlined" onClick={() => { setOpen(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddProdPop;