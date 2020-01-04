import React, { useContext } from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import moment from 'moment';
import { stringify } from 'qs';
import octokit from '@octokit/rest';
import Spin from '@/components/Spin';
import GlobalContext from '@/components/GlobalContext/context';
import { useUserInfo } from '@/utils/hooks/users';
import { AUTHORIZE_URL, CLIENT_ID, SCOPE } from '@/utils/constants';

function authorize() {
  const params = {
    client_id: CLIENT_ID,
    scope: SCOPE,
  };
  window.location.href = `${AUTHORIZE_URL}?${stringify(params)}`;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function UserInfo() {
  const classes = useStyles();
  const {
    authorised,
    setOctokit,
    userInfo,
    userInfoLoading = false,
  } = useContext(GlobalContext);
  useUserInfo();

  const isReponseOk = authorised && !userInfoLoading && userInfo;

  const handleClick = () => {
    if (!authorised && process.env.NODE_ENV === 'development') {
      setOctokit(new octokit({ auth: 'bc3f53b7cdd6752731387cf1eb23448311c4cb3b' }));
      return;
    }

    if (authorised) {
      window.open(userInfo?.html_url, '_blank');
      return;
    }
    authorize();
  }

  return (
    <Spin spinning={userInfoLoading}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              alt={isReponseOk ? userInfo!.login : "Visitor"}
              src={isReponseOk ? userInfo!.avatar_url : undefined}
            />
          }
          title={isReponseOk ? userInfo!.login : "Visitor"}
          subheader={isReponseOk ? moment(userInfo!.created_at).format('YYYY-MM-DD HH:mm:ss') : "Hello."}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {isReponseOk ? userInfo!.bio : "Click button to authorize by github."}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={handleClick}
          >
            {authorised && !userInfoLoading ? "homepage" : "authorize"}
          </Button>
        </CardActions>
      </Card>
    </Spin>
  );
}
