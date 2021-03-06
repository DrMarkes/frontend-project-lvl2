#! /usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const programm = new Command();

programm
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

programm.parse();
