import { useContext } from 'react';
import { useAsync } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsync';
import GlobalContext from '@/components/GlobalContext/context';
import { getToken, GetTokenResponse } from '@/services/authorize';

export function useCode(code: string): [string | undefined, AsyncState<GetTokenResponse>] {
  const { setOctokit: setGlobalOctokit } = useContext(GlobalContext);

  let state: AsyncState<GetTokenResponse> = { loading: true };
  if (code) {
    state = useAsync(async () => await getToken(code), [code]);
  }
  const token = state?.value?.access_token;

  if (token) {
    setGlobalOctokit({ auth: token });
    localStorage.setItem("TOKEN", token);
  }

  return [token, state];
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
