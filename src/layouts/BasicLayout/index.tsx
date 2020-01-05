import React, { useContext } from 'react';
import router from 'umi/router';
import GlobalContext from '@/components/GlobalContext/context';
import setOctokit from '@/utils/octokit';
import { useCode } from '@/utils/hooks/users';

const BasicLayout: React.FC = props => {
  const { setOctokit: setGlobalOctokit, authorised } = useContext(GlobalContext);
  const [code, token, state] = useCode();

  if (code) {
    if (state.loading) {
      return <p>Get token...</p>;
    } else if (token) {
      setGlobalOctokit(setOctokit({ auth: token }));
      localStorage.setItem("TOKEN", token);
      router.replace('/dashboard');
    }
    return <p>Get token failed.</p>
  }

  if (authorised) {
    router.push('/dashboard');
  }

  return (
    <div>
      {props.children}
    </div>
  )
};

export default BasicLayout;
