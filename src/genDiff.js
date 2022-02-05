import _ from 'lodash';
import path from 'path';
import * as fs from 'fs';

const readFile = (filePath) => {
  const normalizePath = path.resolve(filePath);

  return fs.readFileSync(normalizePath, 'utf-8');
};

const getDiff = (data1, data2) => {
  const sortedKeys = _.sortBy([...Object.keys(data1), ...Object.keys(data2)]);
  const uniqKeys = _.sortedUniq(sortedKeys);

  const result = uniqKeys
    .flatMap((key) => {
      const value1 = _.has(data1, key) ? `- ${key}: ${data1[key]}` : [];
      const value2 = _.has(data2, key) ? `+ ${key}: ${data2[key]}` : [];

      return data1[key] === data2[key]
        ? [`  ${key}: ${data1[key]}`]
        : [value1, value2];
    }).flat().join('\n  ');

  return `{\n  ${result}\n}`;
};

const genDiff = (filePath1, filePath2) => {
  const data1 = JSON.parse(readFile(filePath1));
  const data2 = JSON.parse(readFile(filePath2));

  const diff = getDiff(data1, data2);

  return diff;
};

export default genDiff;
