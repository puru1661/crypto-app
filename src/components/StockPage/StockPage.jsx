import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StockPage() {
    const { symbol} = useParams();
    const [data,setData] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/stock_data?symbol=${symbol}`)
        .then(res=> {
            setData(res.data);
            console.log(res.data);
        })
    },[symbol])

  return (
    <div>StockPage</div>
  )
}

export default StockPage