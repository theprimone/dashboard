import React, { useContext } from 'react';
import GlobalContext from '@/components/GlobalContext/context';
import { useCode } from '@/utils/hooks/users';
import Octokit from '@octokit/rest';

const BasicLayout: React.FC = props => {
  const { setOctokit } = useContext(GlobalContext);
  const [code, token] = useCode();

  if (code && !token) {
    return <p>Get token...</p>;
  }
  if (token) {
    setOctokit(new Octokit({ auth: token }));
  }

  return (
    <div>
      {props.children}
    </div>
  )
};

export default BasicLayout;
