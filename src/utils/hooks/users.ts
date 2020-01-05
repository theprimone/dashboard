import { useContext } from 'react';
import { useAsync } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsync';
import GlobalContext from '@/components/GlobalContext/context';
import { parse } from 'qs';
import { getToken, GetTokenResponse } from '@/services/authorize';

export function useCode(): [string, string | undefined, AsyncState<GetTokenResponse>] {
  const { code } = parse(location.search.replace(/^\?/, ''));
  let state: AsyncState<GetTokenResponse> = { loading: true };
  if (code) {
    state = useAsync(async () => await getToken(code), [code]);
  }
  const token = state?.value?.access_token;

  return [code, token, state];
}

export function useUserInfo() {
  const {
    authorised,
    octokit,
    userInfoLoading,
    userInfo,
    setUserInfo,
    setUserInfoLoading,
  } = useContext(GlobalContext);

  async function getUserInfo() {
    if (!userInfo && !userInfoLoading) {
      setUserInfoLoading(true);
      const response = await octokit.users.getAuthenticated();
      setUserInfoLoading(false);
      setUserInfo(response.data);
      return response;
    }
  }
  return useAsync(getUserInfo, [authorised, octokit]);
}
