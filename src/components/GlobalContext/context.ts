import React from 'react';
// import moment from 'moment';
import Octokit from '@octokit/rest';

export const isAuthorised = () => !!localStorage.getItem("TOKEN");

export const setDefaultGlobalData = () => ({
  authorised: isAuthorised(),
  // currentYear: moment().get('year'),
  octokit: new Octokit(isAuthorised ? { auth: localStorage.getItem("TOKEN")! } : undefined),
  setOctokit: () => { },
})

export interface GlobalConsumerProps {
  authorised: boolean;
  currentYear?: number;
  /**
   * ref: https://octokit.github.io/rest.js
   */
  octokit: Octokit;
  setOctokit: (octokit: Octokit) => void;
}

export const GlobalContext = React.createContext<GlobalConsumerProps>(setDefaultGlobalData());

GlobalContext.displayName = 'Global ConfigContext';

export default GlobalContext;
