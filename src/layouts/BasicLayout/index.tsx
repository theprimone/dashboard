import React, { useContext } from 'react';
import router from 'umi/router';
import GlobalContext from '@/components/GlobalContext/context';
import { useCode } from '@/utils/hooks/users';
import Octokit from '@octokit/rest';

const BasicLayout: React.FC = props => {
  const { setOctokit } = useContext(GlobalContext);
  const [code, token, state] = useCode();

  if (code) {
    if (state.loading) {
      return <p>Get token...</p>;
    } else if (token) {
      setOctokit(new Octokit({ auth: token }));
      localStorage.setItem("TOKEN", token);
      router.replace('/');
    }
    return <p>Get token failed.</p>
  }

  return (
    <div>
      {props.children}
    </div>
  )
};

export default BasicLayout;
