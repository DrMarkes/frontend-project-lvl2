import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';
import buildDiff from './buildDiff.js';

const loadData = (filePath) => {
  const normalizePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(normalizePath, 'utf-8');
  const extName = path.extname(filePath);
  const data = parse(fileContent, extName);

  return data;
};

const genDiff = (filePath1, filePath2, formatter = 'stylish') => {
  const data1 = loadData(filePath1);
  const data2 = loadData(filePath2);

  const diff = buildDiff(data1, data2);

  const format = getFormatter(formatter);

  return format(diff);
};

export default genDiff;
