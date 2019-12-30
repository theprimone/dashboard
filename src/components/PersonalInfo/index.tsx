import React from 'react';
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

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    maxWidth: 345,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function MediaCard() {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  const login = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=fba2176a59765757bbf9&scope=public_repo`;
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              alt="theprimone"
              src="https://avatars2.githubusercontent.com/u/18096089?s=400&u=ac70c17caf8cb7e48d0a4f8b8ef28825688cbb8d&v=4"
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
          onClick={login}
        >
          {token ? "Homepage" : "Login"}
        </Button>
      </CardActions>
    </Card>
  );
}
