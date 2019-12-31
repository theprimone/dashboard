import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { useAsync } from 'react-use';
import { parse } from 'qs';
import { getToken } from '@/services/authorize';
import { clientWithAuth } from '@/utils/constants';

function authorize() {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=fba2176a59765757bbf9&scope=public_repo`;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    maxWidth: 345,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function PersonalInfo() {
  const classes = useStyles();

  const token = localStorage.getItem("token");
  
  const { code } = parse(location.search.replace(/^\?/, ''));
  let state = {};
  if (code) {
    state = useAsync(async () => await getToken(code), [code]);
  }
  console.log(state);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              alt="theprimone"
              src="https://avatars2.githubusercontent.com/u/18096089?v=4"
            />
          }
          title="theprimone"
          subheader="2016-01-01"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            如果不去做的话，那就意味着不重要，至少现目前来看。
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={authorize}
        >
          {token ? "Homepage" : "Login"}
        </Button>
      </CardActions>
    </Card>
  );
}
