import React, { useContext } from 'react';
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
import Spin from '@/components/Spin';
import GlobalContext from '@/components/GlobalContext/context';
import { useUserInfo } from '@/utils/hooks/users';

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
  const { authorised } = useContext(GlobalContext);
  const { value, loading } = useUserInfo();

  const isReponseOk = authorised && !loading && value && value.status === 200;

  return (
    <Spin spinning={loading}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar
                alt={isReponseOk ? value!.data.login : "Visitor"}
                src={isReponseOk ? value!.data.avatar_url : undefined}
              />
            }
            title={isReponseOk ? value!.data.login : "Visitor"}
            subheader={isReponseOk ? value!.data.created_at : "Hello."}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {isReponseOk ? value!.data.bio : "Click button to authorize by github."}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={authorize}
          >
            {/* {token ? "Homepage" : "Login"} */}
            authorize
          </Button>
        </CardActions>
      </Card>
    </Spin>
  );
}
