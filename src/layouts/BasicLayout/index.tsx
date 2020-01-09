import React, { useContext } from 'react';
import GlobalContext from '@/components/GlobalContext/context';
import { getCode } from '@/utils/utils';
import Start from '@/pages/Start';
import Authorize from '@/pages/Authorize';

const BasicLayout: React.FC = props => {
  const { authorised } = useContext(GlobalContext);
  const code = getCode();

  if (code) {
    return <Authorize />;
  }

  if (!authorised) {
    return <Start />
  }

  return (
    <div>
      {props.children}
    </div>
  )
};

export default BasicLayout;
