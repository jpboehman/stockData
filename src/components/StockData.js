import React, { useState } from 'react'
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

    const submitDate = () => {
        if (!date) return;
        fetch(userUrl.concat(date))
        .then(response => {
            if (response.status !== 200) return setHideResults(true);
            return response.json();
        })
        .then((resData) => {
            const { data } = resData;
            console.log(data);
            setStockResults({
                close: data[0].close,
                date,
                high: data[0].high,
                low: data[0].low,
                open: data[0].open,
            });
            setHideResults(false);
        }).catch(e => alert(`The call failed with the error ${JSON.stringify(e)}`));
    }
    
    return (
        <div id="stocksApp">
            <TextField type="text" label="Date:" id="date" onChange={(event) => setDate(event.target.value)}></TextField>
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
