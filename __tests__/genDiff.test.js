import { test, expect, beforeAll } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const getCheckFile = (checkPath) => {
  const normalizeCheckPath = getFixturePath(checkPath);
  const check = fs.readFileSync(normalizeCheckPath, 'utf-8').trim();

  return check;
};

let check1;
let check2;
let check3;
let check4;

beforeAll(() => {
  check1 = getCheckFile('check1.txt');
  check2 = getCheckFile('check2.txt');
  check3 = getCheckFile('check3.txt');
  check4 = getCheckFile('check4.txt');
});

test('gendiff json to stylish', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const file3Path = getFixturePath('file3.json');

  expect(genDiff(file1Path, file2Path)).toBe(check1);
  expect(genDiff(file2Path, file1Path)).toBe(check2);
  expect(genDiff(file1Path, file3Path)).toBe(check3);
  expect(genDiff(file3Path, file1Path)).toBe(check4);
});

test('gendiff yaml to stylish', () => {
  const file1Path = getFixturePath('file1.yaml');
  const file2Path = getFixturePath('file2.yml');
  const file3Path = getFixturePath('file3.yaml');

  expect(genDiff(file1Path, file2Path)).toBe(check1);
  expect(genDiff(file2Path, file1Path)).toBe(check2);
  expect(genDiff(file1Path, file3Path)).toBe(check3);
  expect(genDiff(file3Path, file1Path)).toBe(check4);
});
