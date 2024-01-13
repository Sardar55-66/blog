import React from 'react';
import { Alert, Space } from 'antd';
import './ErrorComponent.scss';
import { useNavigate } from 'react-router-dom';

const onClose = () => {

};

function ErrorComponent(props) {
  const errorText = props.error;
  const navigate = useNavigate();

  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Alert
          message={errorText}
          description="Ooops.. something went wrong, we are doing our best to fix it soon!"
          type="error"
          closable
          onClose={onClose}
        />
      </Space>
      <button onClick={() => navigate('/signup')} className="error-btn">back</button>
    </>
  );
}

export default ErrorComponent;
