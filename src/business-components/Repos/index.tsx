import React, { memo } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Chip,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import StarIcon from '@material-ui/icons/Star';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import Spin from '@/components/Spin';
import { useRepos } from '@/utils/hooks/repos';

function sumArray<T>(arr: T[], field: string) {
  const reducer = (accumulator: number, currentValue: T) => accumulator + (currentValue as any)?.[field];
  return arr.reduce(reducer, 0);
}

const useStyles = makeStyles(() => createStyles({
  icon: {
    verticalAlign: 'bottom',
  },
}));

export default memo(function Repos() {
  console.log('render Repos');
  const classes = useStyles();
  const { value, loading } = useRepos();

  const { data } = value || {};
  const starsCount = () => data ? sumArray(data, 'stargazers_count') : 0;

  const forksCount = () => data ? sumArray(data, 'forks_count') : 0;

  const languages = data ? [...new Set(data.map(item => item.language).filter(item => item))] : [];

  const renderGrid = (node: JSX.Element) => {
    return (
      <Grid
        item
        xs={6}
        sm={4}
        md={3}
        lg={1}
      >
        {node}
      </Grid>
    )
  }

  return (
    <Spin spinning={loading}>
      <Card>
        <CardHeader
          title="Repos Statistics"
        />
        <CardContent>
          <Grid container>
            {renderGrid(
              <Typography>
                <BookIcon className={classes.icon} />
                {data ? data.length : 0}
              </Typography>
            )}
            {renderGrid(
              <Typography>
                <StarIcon className={classes.icon} />
                {starsCount()}
              </Typography>
            )}
            {renderGrid(
              <Typography>
                <CallSplitIcon className={classes.icon} />
                {forksCount()}
              </Typography>
            )}
            <Grid
              item
              xs={12}
              style={{
                marginTop: 16,
              }}
            >
              {languages.map(item => (
                <Chip
                  key={item}
                  label={item}
                  variant='outlined'
                  style={{
                    marginRight: 8,
                  }}
                />
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Spin>
  );
})
