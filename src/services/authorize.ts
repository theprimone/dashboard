import { CLIENT_ID, CLIENT_SECRET } from '@/utils/constants';
import request from '@/utils/request';

export async function getToken(code: string) {
  return await request("https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token", {
    method: "POST",
    data: {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }
  });
}
