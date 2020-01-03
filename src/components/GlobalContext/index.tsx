import React from 'react';
import _merge from 'lodash/merge';
import Octokit from '@octokit/rest';
import GlobalContext, { GlobalConsumerProps, setDefaultGlobalData } from './context';

export interface GlobalProviderProps {
  octokit?: Octokit;
  setOctokit?: (octokit: Octokit) => void;
}

interface GlobalProviderState extends GlobalConsumerProps { }

export class GlobalProvider extends React.Component<GlobalProviderProps, GlobalProviderState> {
  constructor(props: GlobalProviderProps) {
    super(props);

    this.state = {
      ...setDefaultGlobalData(),
      setOctokit: this.setOctokit,
    };
  }

  setOctokit = (octokit: Octokit) => {
    this.setState({
      authorised: true,
      octokit,
    });
  }

  render() {
    const { children } = this.props;
    return (
      <GlobalContext.Provider value={this.state}>
        {children}
      </GlobalContext.Provider>
    );
  }
}
