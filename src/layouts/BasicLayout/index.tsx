import React, { useContext } from 'react';
import GlobalContext from '@/components/GlobalContext/context';
import { useCode } from '@/utils/hooks/users';

const BasicLayout: React.FC = props => {
  const { setOctokit } = useContext(GlobalContext);
  const [code, token] = useCode();
  console.log(code, token);

  if (code) {
    return <p>Get token...</p>;
  }

  return (
    <div>
      {props.children}
    </div>
  )
};

export default BasicLayout;
