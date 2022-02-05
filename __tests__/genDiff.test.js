import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const getCheckFile = (checkPath) => {
  const normalizeCheckPath = getFixturePath(checkPath);
  const check = fs.readFileSync(normalizeCheckPath, 'utf-8').trim();

  return check;
};

test('gendiff json to stylish', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const file3Path = getFixturePath('file3.json');

  const check1 = getCheckFile('check1.txt');
  const check2 = getCheckFile('check2.txt');
  const check3 = getCheckFile('check3.txt');
  const check4 = getCheckFile('check4.txt');

  expect(genDiff(file1Path, file2Path)).toBe(check1);
  expect(genDiff(file2Path, file1Path)).toBe(check2);
  expect(genDiff(file1Path, file3Path)).toBe(check3);
  expect(genDiff(file3Path, file1Path)).toBe(check4);
});
