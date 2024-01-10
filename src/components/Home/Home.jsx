import React from 'react';

import './Home.scss';
import { useDispatch } from 'react-redux';
import {  refreshArticles } from '../api/get-api-data';

export function Home() {
  const dispatch = useDispatch();

  return (
    <div
      className="home"
      onClick={() => dispatch(refreshArticles())}
    >
      Home
    </div>
  );
}
