import { networkInterfaces } from 'os';

/**
 * 获取本机ip
 */
export const getIPAdress = (): string => {
  let interfaces = networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (const iterator of iface) {
      if (iterator.family === 'IPv4' && iterator.address !== '127.0.0.1' && !iterator.internal) {
        return iterator.address;
      }
    }
  }
};