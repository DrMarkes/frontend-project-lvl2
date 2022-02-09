import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path
  .join(__dirname, '..', '__fixtures__', filename);

const getCheckFile = (checkPath) => {
  const normalizeCheckPath = getFixturePath(checkPath);
  const check = fs.readFileSync(normalizeCheckPath, 'utf-8').trim();

  return check;
};

const checkNames = [
  'stylish1.txt',
  'stylish2.txt',
  'stylish3.txt',
  'stylish4.txt',
];
const stylishChecks = checkNames.map((name) => getCheckFile(name));

const plainNames = ['plain1.txt', 'plain2.txt'];
const plainChecks = plainNames.map((name) => getCheckFile(name));

const jsonNames = ['file1.json', 'file2.json', 'file3.json'];
const jsonPaths = jsonNames.map((name) => getFixturePath(name));

const yamlNames = ['file1.yaml', 'file2.yml', 'file3.yaml'];
const yamlPaths = yamlNames.map((name) => getFixturePath(name));

test('gendiff json to stylish', () => {
  expect(genDiff(jsonPaths[0], jsonPaths[1])).toBe(stylishChecks[0]);
  expect(genDiff(jsonPaths[1], jsonPaths[0])).toBe(stylishChecks[1]);
  expect(genDiff(jsonPaths[0], jsonPaths[2])).toBe(stylishChecks[2]);
  expect(genDiff(jsonPaths[2], jsonPaths[0])).toBe(stylishChecks[3]);
});

test('gendiff yaml to stylish', () => {
  expect(genDiff(yamlPaths[0], yamlPaths[1])).toBe(stylishChecks[0]);
  expect(genDiff(yamlPaths[1], yamlPaths[0])).toBe(stylishChecks[1]);
  expect(genDiff(yamlPaths[0], yamlPaths[2])).toBe(stylishChecks[2]);
  expect(genDiff(yamlPaths[2], yamlPaths[0])).toBe(stylishChecks[3]);
});

test('gendiff json to plain', () => {
  expect(genDiff(jsonPaths[0], jsonPaths[1], 'plain')).toBe(plainChecks[0]);
  expect(genDiff(jsonPaths[1], jsonPaths[0], 'plain')).toBe(plainChecks[1]);
});

test('gendiff yaml to plain', () => {
  expect(genDiff(yamlPaths[0], yamlPaths[1], 'plain')).toBe(plainChecks[0]);
  expect(genDiff(yamlPaths[1], yamlPaths[0], 'plain')).toBe(plainChecks[1]);
});

test('throws on error type formatter', () => {
  expect(() => {
    genDiff(yamlPaths[1], yamlPaths[0], 'error');
  }).toThrow();
});

test('throws on error type diff', () => {
  expect(() => {
    stylish({ type: 'error' });
  }).toThrow();
});
