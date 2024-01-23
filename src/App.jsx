import { useState } from 'react'
import RTable from './components/Table'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RTable/>
    </>
  )
}

export default App
