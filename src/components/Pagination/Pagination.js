import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

import './Pagination.scss'
import { useDispatch, useSelector } from 'react-redux';

import { nextPage } from '../api/get-api-data';
import { addPageValue } from '../Actions/Actions';
import { Link } from 'react-router-dom';

export default function PaginationControlled() {

  const dispatch = useDispatch()

  const page = useSelector(state => state.page.page)

  

  //const [page, setPage] = useState(1);

  const handleChange = (event, value) => {  
    dispatch(nextPage())
    dispatch(addPageValue(value))
    //setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography><Link className='page-link' to={`/:${page}`}>Page: {page}</Link></Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
}