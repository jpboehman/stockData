import React, { useState, useRef } from 'react'
import { TextField, Button, List, ListItem, Box, } from '@material-ui/core'


export const StockData = () => {
    const [date, setDate] = useState('');
    const [stockResults, setStockResults] = useState({
        date: date,
        close: Number,
        high: Number,
        low: Number,
        open: Number,
    });
    const [hideResults, setHideResults] = useState(true);
    const userUrl = `https://jsonmock.hackerrank.com/api/stocks?date=`;
    // eslint-disable-next-line no-mixed-operators
    const dateRef = useRef(); // Would grab something like this for all inputs of a form to clear them if we wish

    const submitDate = () => {
        if (!date) return;
        fetch(userUrl.concat(date))
        .then(response => {
            if (response.status !== 200) return setHideResults(true);
            return response.json();
        })
        .then((resData) => {
            const { data } = resData;
            setStockResults({
                close: data[0].close,
                date,
                high: data[0].high,
                low: data[0].low,
                open: data[0].open,
            });
            setHideResults(false);
        }).catch((e) => {
            setHideResults(true);
            setStockResults({
                close: 0,
                date: '',
                high: 0,
                low: 0,
                open: 0,
            })
            dateRef.current.value = '';
            alert(`No stock data, please select a different date`);
            console.error(e);
        })
    }
    
    return (
        <div id="stocksApp">
            <TextField type="text" label="Date:" id="date" inputRef={dateRef} onChange={(event) => setDate(event.target.value)}></TextField>
            <br/>
            <Button type="submit" onClick={submitDate}>Search stocks</Button>
            {!hideResults ? 
            <Box display="flex" justifyContent="center" alignItems="center">
                <List>
                        <ListItem text-align="center">Open: {stockResults.open}</ListItem>
                        <ListItem>Close: {stockResults.close}</ListItem>
                        <ListItem>High: {stockResults.high}</ListItem>
                        <ListItem>Low: {stockResults.low}</ListItem>
                </List>
            </Box>
            : <div><p>No results to show</p></div>}
        </div>
    )
}

export default StockData
