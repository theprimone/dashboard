import { useContext } from 'react';
import { useAsync } from 'react-use';
import { AnyResponse } from '@octokit/rest';
import moment from 'moment';
import GlobalContext from '@/components/GlobalContext/context';

export interface ReposListItemOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  html_url: string;
  type: string;
  site_admin: boolean;
}

export interface ReposListItem {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: ReposListItemOwner;
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: null
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: null
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  permissions: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
}

const reposPerPage = 100;
export function useRepos() {
  const { authorised, octokit, currentYear } = useContext(GlobalContext);
  
  async function getRepos() {
    if (!authorised) { return; }
    const repos: ReposListItem[] = [];

    /**
     * 返回值表示是否异常中断
     * 
     * @param pageRepos 
     */
    function pushPageRepos(pageRepos: ReposListItem[]): boolean {
      for (const repo of pageRepos) {
        if (currentYear && moment(repo.created_at).get('year') > currentYear) {
          return true;
        }
        repos.push(repo);
      }
      return false;
    }

    let pageSize = reposPerPage;
    let page = 1;
    let reposListResponse: AnyResponse;
    do {
      const _reposListResponse = await octokit.repos.list({
        visibility: 'all',
        sort: 'created',
        direction: 'asc',
        per_page: reposPerPage,
        page,
      });
      reposListResponse = _reposListResponse;
      const { status, data } = reposListResponse;
      if (!(status === 200)) {
        octokit.log.error(`get repos error, at page ${page}`);
        continue;
      }
      pageSize = data.length;
      if (pushPageRepos(data)) {
        break;
      };
    } while (pageSize === reposPerPage);

    return {
      ...reposListResponse,
      data: repos,
    }
  }
  return useAsync(getRepos, [authorised, octokit]);
}
