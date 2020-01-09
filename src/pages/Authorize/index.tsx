import React from 'react';
import router from 'umi/router';
import { getCode } from '@/utils/utils';
import { useCode } from '@/utils/hooks/users';

const Authorize: React.FC = () => {
  const code = getCode();
  const [token, state] = useCode(code);

  if (state.loading) {
    return <p>Get token...</p>;
  } else if (token) {
    router.replace('/');
    return null;
  }
  return <p>Get token failed.</p>
};

export default Authorize;
