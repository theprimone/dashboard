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

export default function PersonalInfo() {
  const classes = useStyles();
  const { authorised, setOctokit, userInfo } = useContext(GlobalContext);
  const { loading } = useUserInfo();

  const isReponseOk = authorised && !loading && userInfo;

  const handleClick = () => {
    setOctokit(new octokit({ auth: 'abf85bed5650b92c79ef363a4f715c5ba2fe00de' }));
    return;

    if (authorised) {
      window.open(userInfo?.html_url, '_blank');
      return;
    }
    authorize();
  }

  return (
    <Spin spinning={loading}>
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
            {authorised && !loading ? "homepage" : "authorize"}
          </Button>
        </CardActions>
      </Card>
    </Spin>
  );
}
