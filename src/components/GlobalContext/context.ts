import React from 'react';
// import moment from 'moment';
import { UsersGetAuthenticatedResponse } from '@octokit/rest';
import Octokit from '@octokit/rest';

export const isAuthorised = () => !!localStorage.getItem("TOKEN");

export const setDefaultGlobalData = () => ({
  authorised: isAuthorised(),
  // currentYear: moment().get('year'),
  octokit: new Octokit(isAuthorised ? { auth: localStorage.getItem("TOKEN")! } : undefined),
  setOctokit: () => { },
  setUserInfo: () => { },
})

export interface GlobalConsumerProps {
  authorised: boolean;
  userInfo?: UsersGetAuthenticatedResponse;
  currentYear?: number;
  /**
   * ref: https://octokit.github.io/rest.js
   */
  octokit: Octokit;
  setOctokit: (octokit: Octokit) => void;
  setUserInfo: (userInfo: UsersGetAuthenticatedResponse) => void;
}

export const GlobalContext = React.createContext<GlobalConsumerProps>(setDefaultGlobalData());

GlobalContext.displayName = 'Global ConfigContext';

export default GlobalContext;
