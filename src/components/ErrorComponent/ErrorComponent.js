import React from 'react';
import { Alert, Space } from 'antd';
import './ErrorComponent.scss'
import { Link, useNavigate } from 'react-router-dom';


const onClose = (e) => {
  console.log(e, 'I was closed.');
};


export const ErrorComponent = (props) => { 

const errorText = props.error
const navigate = useNavigate()

   return <>
   <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert
      message={errorText}
      description='Ooops.. something went wrong, we are doing our best to fix it soon!'
      type="error"
      closable
      onClose={onClose}
    />
  </Space>
  <button onClick={() => navigate('/signup')} className='error-btn'>back</button></>
};