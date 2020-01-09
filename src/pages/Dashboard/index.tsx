import React, { useContext } from 'react';
import {
  Container,
  Grid,
  Grow,
} from '@material-ui/core';
import { TransitionMotion, spring, presets } from 'react-motion';
import GlobalContext from '@/components/GlobalContext/context';
import UserInfo from '@/business-components/UserInfo';
import Repos from '@/business-components/Repos';
import styles from './index.less';

function FadeInOut({ children }: { children: { key: string; node: JSX.Element }[] }) {
  function willEnter() {
    return { opacity: 0 };
  }

  function willLeave() {
    return { opacity: spring(0, presets.stiff) };
  }

  return (
    <TransitionMotion
      willEnter={willEnter}
      willLeave={willLeave}
      styles={children.map(item => ({
        key: item.key,
        data: item.node,
        style: {
          opacity: spring(1, presets.stiff),
        },
      }))}
    >
      {(interpolatedStyles) => (
        <div>
          {interpolatedStyles.map((config) => {
            // console.log(config);
            return (
              <div key={config.key} style={config.style}>
                {config.data}
              </div>
            )
          })}
        </div>
      )}
    </TransitionMotion>
  )
}

const Dashboard: React.FC = () => {
  const { authorised, userInfo } = useContext(GlobalContext);

  const isValidAccount = !!(authorised && userInfo);

  return (
    <Container disableGutters>
      <Grid container>
        {/*breakpoints ref: https://material-ui.com/customization/breakpoints/ */}
        <Grow in={isValidAccount}>
          <Grid item xs={12} sm={4}>
            <UserInfo />
          </Grid>
        </Grow>
        <Grow in={isValidAccount} timeout={1000}>
          <Grid item xs={12} sm={8}>
            <Repos />
          </Grid>
        </Grow>
      </Grid>
    </Container>
  );
}

export default Dashboard;
