import React, { useState } from 'react';
import { Button, TextField, MenuItem, Box, Modal } from '@mui/material';

interface AddOrderProps {
    onAddOrder: (order: { id: string; name: string; from: string; to: string; phone: string; email: string; created: string; deliveryDate: string; status: string; parcelnum: number }) => void;
    open: boolean;
    onClose: () => void;
}

const AddOrder: React.FC<AddOrderProps> = ({ onAddOrder, open, onClose }) => {
    const [newOrder, setNewOrder] = useState({
        id: '',
        name: '',
        from: '',
        to: '',
        phone: '',
        email: '',
        created: '',
        deliveryDate: '',
        status: 'Ongoing',
        parcelnum: 0
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleSubmit = () => {
        onAddOrder(newOrder);
        onClose();
        setNewOrder({
            id: '',
            name: '',
            from: '',
            to: '',
            phone: '',
            email: '',
            created: '',
            deliveryDate: '',
            status: 'Ongoing',
            parcelnum: 0
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, bgcolor: 'background.paper', boxShadow: 24, width: 400, margin: 'auto', marginTop: '3%' }}>
                <TextField name="id" label="Order ID" value={newOrder.id} onChange={handleInputChange} />
                <TextField name="name" label="Customer Name" value={newOrder.name} onChange={handleInputChange} />
                <TextField name="from" label="From" value={newOrder.from} onChange={handleInputChange} />
                <TextField name="to" label="To" value={newOrder.to} onChange={handleInputChange} />
                <TextField name="phone" label="Phone" value={newOrder.phone} onChange={handleInputChange} />
                <TextField name="email" label="Email" value={newOrder.email} onChange={handleInputChange} />
                <TextField name="created" label="Order Date" type="date" value={newOrder.created} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                <TextField name="deliveryDate" label="Delivery Date" type="date" value={newOrder.deliveryDate} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                <TextField select name="status" label="Status" value={newOrder.status} onChange={handleInputChange}>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                </TextField>
                <TextField name="parcelnum" label="Number of Parcels" type="number" value={newOrder.parcelnum} onChange={handleInputChange} />
                <Box display="flex" justifyContent="space-between">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Add</Button>
                    <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddOrder;
