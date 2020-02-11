import { humpToLine } from './str';
/**
 * @param {type}
 * @return:
 * @Description:在修改数据的时候将对象转换为key=val,key1=val1的类型
 */
export const sqlParamsJoin = (data: { [propsName: string]: any }): string => {
  const result = [];
  Object.keys(data).forEach(key => {
    if (data[key]) {
      result.push(`${humpToLine(key)}='${data[key]}'`);
    }
  });
  return ` ${result.join(',')} `;
};

/**
 * @param {type}
 * @return:
 * @Description: 拼接插入数据的sql语句
 */
export const sqlInsertJoin = (data: { [propsName: string]: any }): string => {
  const keys = [];
  const values = [];
  Object.keys(data).forEach(key => {
    if (data[key]) {
      keys.push(humpToLine(key));
      values.push(data[key]);
    }
  });
  return ` (${keys.join(',')}) values (${values.join(',')}) `;
};
