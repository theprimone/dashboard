import React from 'react';
import { GlobalProvider } from '@/components/GlobalContext';
// import styles from './index.css';

const GlobalLayout: React.FC = props => {
  return (
    <GlobalProvider>
      {/* <h1 className={styles.title}>Yay! Welcome to umi!</h1> */}
      {props.children}
    </GlobalProvider>
  );
};

export default GlobalLayout;
