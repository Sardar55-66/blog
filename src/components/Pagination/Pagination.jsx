import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import './Pagination.scss';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { getArticles, nextPage } from '../api/get-api-data';
import { addPageValue } from '../Actions/Actions';

export default function PaginationControlled() {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.page.page);
  const handleChange = (_, value) => {
    dispatch(nextPage());
    dispatch(getArticles());
    dispatch(addPageValue(value));
  };

  return (
    <Stack spacing={2}>
      <Typography>
        <Link className="page-link" to={`/:${page}`}>
          Page:
          {page}
        </Link>
      </Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
};