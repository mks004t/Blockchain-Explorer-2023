import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'

const Search = ({ headText, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  let type = "block";
  if (headText === 'Transaction by Hash') type = "transaction";

  useEffect(() => {

  }, [searchTerm])

  return (
    <Stack direction="row" ml={5} sx={{ height: "50px !important", width: "500px", display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
      <h4>{headText}</h4>
      <input style={{ height: "30px", width: "200px" }} type="text" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
      <button style={{ height: "40px" }} onClick={() => { handleSearch(searchTerm, type), setSearchTerm("") }} >Search</button>
    </Stack>
  )
}

export default Search