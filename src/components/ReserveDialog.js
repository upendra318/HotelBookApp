import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import * as React from 'react';
import { useState, useEffect } from 'react';

export default function ReserveDialog(props) {
    const { onClose, pricePerNight, open, onReserve, noOfGuests } = props;
    const [guests, setGuests] = useState(1);
    const [startDateValue, setStartDateValue] = useState(dayjs());
    const [endDateValue, setEndDateValue] = useState(dayjs().add(2, 'day'));
    const [diffDates, setDiffDates] = useState(2);
    const [minDate, setMinDate] = useState(dayjs());

    let guestCount = new Array(noOfGuests).fill('');

    useEffect(() => {
        var value = endDateValue.diff(startDateValue, 'day');
        setDiffDates(value);
    }, [endDateValue, startDateValue])

    const handleClose = () => {
        onClose();
    };

    const handleGuestChange = (event) => {
        setGuests(event.target.value);
    };
    const selectReserve = () => {
        onReserve({
            startDateValue,
            endDateValue,
            pricePerNight,
            diffDates,
            guests,
            finalPrice: pricePerNight * diffDates
        });
        onClose();
    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>${pricePerNight} / night</DialogTitle>
            <div className='dialog-container'>
                <FormControl fullWidth>
                    <InputLabel id="guest-label">Guests</InputLabel>
                    <Select
                        labelId="guest-label"
                        id="guest-label"
                        value={guests}
                        label="Guests"
                        onChange={handleGuestChange}
                    >
                        {
                            guestCount.map((e, i) => <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <p style={{ marginTop: '10px' }}>Select Dates</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            label="Start Date"
                            value={startDateValue}
                            onChange={(newValue) => setStartDateValue(newValue)}
                            minDate={minDate}
                        />
                        <DatePicker
                            format="DD/MM/YYYY"
                            label="End Date"
                            value={endDateValue}
                            onChange={(newValue) => setEndDateValue(newValue)}
                            minDate={startDateValue}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <div className='guest-container-pricing'>
                    <p>${pricePerNight} x {diffDates} nights</p>
                    <p>${pricePerNight * diffDates}</p>
                </div>
                <div className='subtotal-pricing'>
                    <p>Subtotal: ${pricePerNight * diffDates}</p>
                </div>
                <Button variant="outlined" style={{ marginBottom: '20px' }} onClick={selectReserve} fullWidth>Reserve</Button>
            </div>
        </Dialog>
    );
}