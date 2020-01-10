import React, { memo } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Chip,
  Paper,
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

  const top3Repos = data ? data.sort((a, b) => -(a.stargazers_count - b.stargazers_count)).slice(0, 3).filter(item => item) : [];

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
              <Typography variant='subtitle1' gutterBottom>
                Top 3 Repos by Stargazers
              </Typography>
              {top3Repos.map(item => (
                <Paper
                  key={item.id}
                  variant='outlined'
                  style={{
                    marginBottom: 8,
                    padding: '4px 8px',
                  }}
                >
                  <Typography>
                    <a href={item.html_url} target='_blank'>{item.name}</a>&nbsp;
                    <StarIcon className={classes.icon} />
                    <a href={`${item.html_url}/stargazers`}>
                      {item.stargazers_count}
                    </a>
                  </Typography>
                  <Typography>
                    {item.description}
                  </Typography>
                </Paper>
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: 12,
              }}
            >
              <Typography variant='subtitle1' gutterBottom>
                Used Languages
              </Typography>
              {languages.map(item => (
                <Chip
                  key={item}
                  label={item}
                  variant='outlined'
                  style={{
                    marginRight: 8,
                    marginBottom: 4,
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
