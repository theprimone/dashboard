import router from 'umi/router';
import Octokit, { Options } from '@octokit/rest';

export default function setOctokit(options?: Options) {
  const octokit = new Octokit(options);

  octokit.hook.error("request", async (error, options) => {
    console.log(error);
    if (error.status === 401) {
      localStorage.clear();
      router.push('/');
    }

    throw error;
  });

  return octokit;
}
