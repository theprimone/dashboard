import { parse } from 'qs';

export function getCode(): string {
  const { code } = parse(location.search.replace(/^\?/, ''));
  return code;
}
