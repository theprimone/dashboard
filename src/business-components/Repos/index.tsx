import React, { useContext } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import StarIcon from '@material-ui/icons/Star';
import Spin from '@/components/Spin';
import GlobalContext from '@/components/GlobalContext/context';
import { useRepos, ReposListItem } from '@/utils/hooks/repos';

const useStyles = makeStyles(() => createStyles({
  icon: {
    verticalAlign: 'bottom',
  },
}));

export default function Repos() {
  const classes = useStyles();
  const { value, loading } = useRepos();

  const { data } = value || {};
  const starCount = () => {
    if (data) {
      const reducer = (accumulator: number, currentValue: ReposListItem) => accumulator + currentValue.stargazers_count;
      return data.reduce(reducer, 0);
    }
    return 0;
  }
  return (
    <Spin spinning={loading}>
      <Card>
        <CardHeader
          title="Repos Statistics"
        />
        <CardContent>
          <Grid container>
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={1}
            >
              <Typography>
                <BookIcon className={classes.icon} />
                {data ? data.length : 0}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={1}
            >
              <Typography>
                <StarIcon className={classes.icon} />
                {starCount()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Spin>
  );
}
