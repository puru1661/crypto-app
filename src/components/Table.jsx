import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import RangeSlider from './RangeSlider';

function RTable() {
    const [data,setData] = useState([])
    const [search,setSearch] = useState('')
    //const [headers,setHeaders] = useState([])
    console.log(search)

    useEffect(()=> {
        
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
        .then(res => {
            setData(res.data)
            console.log(res.data)
           // setHeaders(res.data.length > 0 ? Object.keys(res.data[0]) : [])
        })
       
    },[])

    const headers = ["Image", "ID", "Current Price", "Market Cap", "High 24h", "Low 24h","price_change_percentage_24h","Circ Supply"];

    const renderTable = (item, header) => {
        switch(header) {
            case "Image":
                return <img src={item.image} alt={item.id} className="w-10 h-10" width="50" height="50" />;
            case "ID":
                return item.id;
            case "Current Price":
                return item.current_price;
            case "Market Cap":
                return item.market_cap;
            case "High 24h":
                return item.high_24h;
            case "Low 24h":
                return item.low_24h;
            case "price_change_percentage_24h":
                return item.price_change_percentage_24h;
            case "Circ Supply":
                return item.circulating_supply;
            default:
                return null;
        }
    };

  return (
    <Box
        sx={{
          bgcolor: 'white',
          boxShadow: 1,
          borderRadius: 8,
          p: 2,
          minWidth: 300,
          mt:20
        }}
      >
           
    <TextField onChange={(e) => setSearch(e.target.value)} sx={{mb:2}} id="outlined-basic" label="Search Crypto" variant="outlined" />
    <RangeSlider/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          {headers.map(header => (
                            <TableCell key={header} className="px-4 py-2">{header}</TableCell>
                        ))}
          </TableRow>
        </TableHead>
        <TableBody>
            {data.filter((item) => {
                return search.toLocaleLowerCase() === '' ? item : item.id.toLocaleLowerCase().includes(search)
            }).map((item,index)=> (
                            <TableRow key={index} className="border-b">
                                {headers.map(header => (
                                    <TableCell key={header} className="px-4 py-2">{renderTable(item,header)}</TableCell>
                                ))}
                            </TableRow>
                        ))}

        </TableBody>
      </Table>
    </TableContainer>                           

    
        </Box>

        
  )
}

export default RTable