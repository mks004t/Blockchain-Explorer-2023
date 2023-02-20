import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import Heading from './Heading'

const Result = ({ result, type }) => {
  let resultType = typeof result;
  return (
    <Box pl={3}>
      <Heading margin={"0px 0 10px 0"} text={`${type} details`} />
      {resultType === 'object'
        ? Object.entries(result).map(([key, value]) => (
          <li key={key}>
            <span>{key} : {value}</span>
          </li>
        ))
        : result}
    </Box>
  )
}

export default Result