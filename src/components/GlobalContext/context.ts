import React from 'react';
// import moment from 'moment';
import { UsersGetAuthenticatedResponse } from '@octokit/rest';
import Octokit, { Options } from '@octokit/rest';
import setOctokit from '@/utils/octokit';

export const isAuthorised = () => !!localStorage.getItem("TOKEN");

export const setDefaultGlobalData = () => ({
  authorised: isAuthorised(),
  // currentYear: moment().get('year'),
  octokit: setOctokit(isAuthorised ? {
    auth: localStorage.getItem("TOKEN")!,
  } : undefined),
  setAuthorised: () => { },
  setOctokit: () => { },
  setUserInfo: () => { },
  setUserInfoLoading: () => { },
})

export interface GlobalConsumerProps {
  authorised: boolean;
  userInfo?: UsersGetAuthenticatedResponse;
  userInfoLoading?: boolean;
  currentYear?: number;
  /**
   * ref: https://octokit.github.io/rest.js
   */
  octokit: Octokit;
  setAuthorised: (authorised: boolean) => void;
  setOctokit: (options?: Options) => void;
  setUserInfo: (userInfo?: UsersGetAuthenticatedResponse) => void;
  setUserInfoLoading: (loading: boolean) => void;
}

export const GlobalContext = React.createContext<GlobalConsumerProps>(setDefaultGlobalData());

GlobalContext.displayName = 'Global ConfigContext';

export default GlobalContext;
