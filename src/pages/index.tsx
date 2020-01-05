import React, { useContext } from 'react';
// import styles from './index.css';
// import { formatMessage } from 'umi-plugin-locale';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
} from '@material-ui/core';
import { stringify } from 'qs';
import router from 'umi/router';
import octokit from '@octokit/rest';
import GlobalContext from '@/components/GlobalContext/context';
import { AUTHORIZE_URL, CLIENT_ID, SCOPE } from '@/utils/constants';
import setOctokit from '@/utils/octokit';
import styles from './index.less';

function authorize() {
  const params = {
    client_id: CLIENT_ID,
    scope: SCOPE,
  };
  window.location.href = `${AUTHORIZE_URL}?${stringify(params)}`;
}

export default function Authorize() {
  const { setOctokit: setGlobalOctokit } = useContext(GlobalContext);

  const handleClick = () => {
    if (process.env.NODE_ENV === 'production') {
      authorize();
    } else {
      setGlobalOctokit(setOctokit({ auth: 'd7765e7193e77ebe74f6e3c11e9ec3c7f0f7e53c' }));
      localStorage.setItem('TOKEN', 'd7765e7193e77ebe74f6e3c11e9ec3c7f0f7e53c');
      router.push('/dashboard');
    }
  }

  return (
    <div className={styles.center} style={{ width: 320 }}>
      <Card>
        <CardHeader
          avatar={<Avatar />}
          title="Visitor"
          subheader="Hello."
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Click button to authorize by github.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={handleClick}
          >
            authorize
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
