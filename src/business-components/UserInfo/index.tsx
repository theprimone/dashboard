import React, { useContext } from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
} from '@material-ui/core';
import moment from 'moment';
import { stringify } from 'qs';
import Spin from '@/components/Spin';
import GlobalContext from '@/components/GlobalContext/context';
import { useUserInfo } from '@/utils/hooks/users';
import setOctokit from '@/utils/octokit';
import { AUTHORIZE_URL, CLIENT_ID, SCOPE } from '@/utils/constants';
import router from 'umi/router';

function authorize() {
  const params = {
    client_id: CLIENT_ID,
    scope: SCOPE,
  };
  window.location.href = `${AUTHORIZE_URL}?${stringify(params)}`;
}

export default function UserInfo() {
  const {
    authorised,
    setOctokit: setGlobalOctokit,
    userInfo,
    userInfoLoading = false,
  } = useContext(GlobalContext);
  useUserInfo();

  const isReponseOk = authorised && !userInfoLoading && userInfo;

  const handleClick = () => {
    if (!authorised && process.env.NODE_ENV === 'development') {
      setGlobalOctokit(setOctokit({ auth: 'bc3f53b7cdd6752731387cf1eb23448311c4cb3b' }));
      return;
    }

    if (authorised) {
      window.open(userInfo?.html_url, '_blank');
      return;
    }
    authorize();
  }

  const handleExit = () => {
    setGlobalOctokit(setOctokit());
    localStorage.clear();
    router.push('/');
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
          subheader={isReponseOk ? moment(userInfo!.created_at).format('YYYY-MM-DD HH:mm:ss') : "-"}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {isReponseOk ? userInfo!.bio : "-"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={handleClick}
          >
            homepage
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={handleExit}
          >
            exit
          </Button>
        </CardActions>
      </Card>
    </Spin>
  );
}
