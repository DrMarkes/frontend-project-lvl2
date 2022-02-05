#! /usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const programm = new Command();

programm
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  });

programm.parse();
