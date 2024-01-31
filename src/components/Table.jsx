import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box,FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import RangeSlider from './RangeSlider';
import '../App.css';
import TablePagination from '@mui/material/TablePagination';
import BasicSelect from './DropDown';
import {Link} from 'react-router-dom';


function RTable() {
    const [data,setData] = useState([])
    const [search,setSearch] = useState('')
    const [page,setPage] = useState(1)
    const rowsPerPage = 50
    const count = 4500
    const [filter,setFilter] = useState([])
    const [selectedFilter, setSelectedFilter] = useState('')
    const [peslider,setPeslider] = useState([-100,100])
    //const [headers,setHeaders] = useState([])

    


    useEffect(()=> {
        
        axios.get('http://127.0.0.1:8000/get_data?page_num=1')
        .then(res => {
            setData(res.data.StocksScreenerData)
            const transformedData = res.data.StocksScreenerData.map(val => {
                return val.TradingInformationData.Industry; // Or any other transformation
            });
            setFilter(transformedData);

            const PEfilter = res.data.StocksScreenerData.map(val => {
                return val.TradingInformationData.StockListingPERatio;
            });
            
            const minPE = Math.min(...PEfilter);
            const maxPE = Math.max(...PEfilter);
            setPeslider([minPE, maxPE]);
            

           // setHeaders(res.data.length > 0 ? Object.keys(res.data[0]) : [])
        // data.map((item) => console.log(item.TradingInformationData))
        })
       
    },[])

    function handlePageChange(page_num) {
        axios.get(`http://127.0.0.1:8000/get_data?page_num=${page_num}`)
        .then(res => {
            setData(res.data.StocksScreenerData)
            const transformedData = res.data.StocksScreenerData.map(val => {
                return val.TradingInformationData.Industry; // Or any other transformation
            });
            setFilter(transformedData);

            const PEfilter = res.data.StocksScreenerData.map(val => {
                return val.TradingInformationData.StockListingPERatio;
            });
            
            const minPE = Math.min(...PEfilter);
            const maxPE = Math.max(...PEfilter);
            setPeslider([minPE, maxPE]);

            console.log(peslider)
           // setHeaders(res.data.length > 0 ? Object.keys(res.data[0]) : [])
        // data.map((item) => console.log(item.TradingInformationData))
        })

    }

    const headers = ["Symbol", "Stock", "Market Cap","Sector","Current Price", "Beta", "P/E Ratio","1 Month Change","3 Month Change","1Y Change"];

    
    const handleFilterChange = (selectedValue) => {
        setSelectedFilter(selectedValue);
    };

    const filteredData = data.filter(item => {
        const matchesIndustry = selectedFilter ? item.TradingInformationData.Industry === selectedFilter : true;
        const withinPERange = item.TradingInformationData.StockListingPERatio >= peslider[0] &&
                              item.TradingInformationData.StockListingPERatio <= peslider[1];
    
        return matchesIndustry && withinPERange;
    });



  return (
    <Box
        sx={{
          bgcolor: '#348CA6 ',
          boxShadow: 1,
          borderRadius: 8,
          p: 2,
          minWidth: 300,
          mt:20,
          overflowX: 'auto'
        }}
      >
   
    
    <TextField onChange={(e) => setSearch(e.target.value)} sx={{mb:2}} id="outlined-basic" label="Search Stock" variant="outlined" />
    <BasicSelect data={filter} onFilterChange={handleFilterChange} />
    <TableContainer component={Paper} sx={{borderRadius:8}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
        {headers.map((header, index) => (
            <TableCell key={header} className={index === 0 ? "stickyColumn" : ""}>
                {header}
                </TableCell>
            ))}
        </TableRow>
        </TableHead>
        <TableBody>
            {/* {data.filter((item) => {
                return search.toLocaleLowerCase() === '' ? item : item.id.toLocaleLowerCase().includes(search)
            }).map((item,index)=> (
                            <TableRow key={index} className="border-b">
                                {headers.map(header => (
                                    <TableCell key={header} className="px-4 py-2">{renderTable(item,header)}</TableCell>
                                ))}
                            </TableRow>
                        ))} */}

            {data && filteredData.filter((val) => {
                return search.toLocaleLowerCase() === '' ? val : val.TradingInformationData.StockDisplayName.toLocaleLowerCase().includes(search)
            }).map((item,index)=>(
                <TableRow key={index} className='border-b'>
                    <TableCell className="stickyColumn">
                    <Link to={`/stock/${item.TradingInformationData.StockListingTicker}`}>
                        {item.TradingInformationData.StockListingTicker}
                    </Link>
                    </TableCell>
                    <TableCell>{item.TradingInformationData.StockDisplayName}</TableCell>
                    <TableCell>{item.TradingInformationData.StockListingMarketCap}</TableCell>
                    <TableCell>{item.TradingInformationData.StockSectorName}</TableCell>
                    <TableCell>{item.TradingInformationData.StockListingLastCloseUSD}</TableCell>
                    <TableCell>{item.TradingInformationData.StockListingBeta}</TableCell>
                    <TableCell>{item.TradingInformationData.StockListingPERatio}</TableCell>
                    <TableCell>{item.PerformanceData.StockOneMonthGain}</TableCell>
                    <TableCell>{item.PerformanceData.StockThreeMonthsGain}</TableCell>
                    <TableCell>{item.PerformanceData.StockYearlyGain}</TableCell>
                    
                </TableRow>
            ) )}

        </TableBody>
      </Table>
      <TablePagination
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => {
                        setPage(newPage);
                        handlePageChange(newPage);
                    }}
                />
    </TableContainer>                           

    
        </Box>

        
  )
}

export default RTable