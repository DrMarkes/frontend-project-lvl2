import { Command } from 'commander';

const gendiff = new Command();

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0');

export default gendiff;
