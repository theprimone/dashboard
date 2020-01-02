import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
      '&:after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        content: "' '",
      }
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

export interface SpinProps {
  spinning?: boolean;
}

const Spin: React.FC<SpinProps> = ({ spinning = true, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div style={{ opacity: spinning ? .5 : 1 }}>
        {children}
      </div>
      {spinning && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
}

export default Spin;
