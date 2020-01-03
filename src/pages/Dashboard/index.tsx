import React from 'react';
import {
  Container,
} from '@material-ui/core';
import PersonalInfo from '@/business-components/PersonalInfo';

const DashBoard: React.FC = () => {
  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <PersonalInfo />
    </Container>
  )
}

export default DashBoard;
