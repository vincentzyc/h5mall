import { isString } from './data-type';

export const humpToLine = (str: string): string => {
  if (isString(str)) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  } else {
    throw new TypeError(`传递的${str}不是字符串`);
  }
};
