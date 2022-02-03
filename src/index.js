import _ from 'lodash';
import path from 'path';
import * as fs from 'fs';

const parseFile = (filepath) => {
  const normalizePath = path.resolve(filepath);
  const fileContent = fs.readFileSync(normalizePath, 'utf-8');

  return JSON.parse(fileContent);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

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
