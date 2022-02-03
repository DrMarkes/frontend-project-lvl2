import _ from 'lodash';
import path from 'path';
import * as fs from 'fs';

const genDiff = (filepath1, filepath2) => {
  const normalizePath1 = path.resolve(filepath1);
  const normalizePath2 = path.resolve(filepath2);

  const fileContent1 = fs.readFileSync(normalizePath1, 'utf-8');
  const fileContent2 = fs.readFileSync(normalizePath2, 'utf-8');

  const data1 = JSON.parse(fileContent1);
  const data2 = JSON.parse(fileContent2);

  const sortedKeys = _.sortBy([...Object.keys(data1), ...Object.keys(data2)]);
  const uniqKeys = _.sortedUniq(sortedKeys);

  const result = uniqKeys.flatMap((key) => {
    if (!_.has(data2, key)) {
      return `- ${key}: ${data1[key]}`;
    }
    if (!_.has(data1, key)) {
      return `+ ${key}: ${data2[key]}`;
    }

    return data1[key] === data2[key] ? `  ${key}: ${data1[key]}` : [`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`];
  }).join('\n  ');

  return `{\n  ${result}\n}`;
};

export default genDiff;
