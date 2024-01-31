import { useState } from 'react'
import RTable from './components/Table'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import StockPage from './components/StockPage/StockPage'

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<RTable/>}/>
        <Route path='/stock/:symbol' element={<StockPage/>}/>
      </Routes>
    </Router>

  
    </>
  )
}

export default App
