import { CLIENT_ID, CLIENT_SECRET, CORS_PROXY_URL, GET_TOKEN_URL } from '@/utils/constants';
import request from '@/utils/request';

export async function getToken(code: string) {
  return await request(`${CORS_PROXY_URL}/${GET_TOKEN_URL}`, {
    method: "POST",
    data: {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }
  });
}
