import { CLIENT_ID, CLIENT_SECRET, CORS_PROXY_URL, GET_TOKEN_URL } from '@/utils/constants';
import request from '@/utils/request';

export interface GetTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}
export async function getToken(code: string): Promise<GetTokenResponse> {
  return await request(`${CORS_PROXY_URL}/${GET_TOKEN_URL}`, {
    method: "POST",
    data: {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }
  });
}
