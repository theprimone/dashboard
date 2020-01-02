import { useContext } from 'react';
import { useAsync } from 'react-use';
import GlobalContext from '@/components/GlobalContext/context';
import { parse } from 'qs';
import { getToken } from '@/services/authorize';

export function useCode() {
  const { code } = parse(location.search.replace(/^\?/, ''));
  let state = { loading: true };
  if (code) {
    state = useAsync(async () => await getToken(code), [code]);
  }
  const token = state?.value?.data?.access_token;
  
  return [code, token];
}

export function useUserInfo() {
  const { authorised, octokit } = useContext(GlobalContext);
  async function getUserInfo() {
    if (authorised) {
      return await octokit.users.getAuthenticated();
    }
  }
  return useAsync(getUserInfo, [authorised, octokit]);
}
