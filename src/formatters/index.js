import stylish from './stylish.js';
import plain from './plain.js';

export default (formatName) => {
  let formatter;
  switch (formatName) {
    case 'stylish':
      formatter = stylish;
      break;
    case 'plain':
      formatter = plain;
      break;
    default:
      throw new Error(`unknown format type: ${formatName}`);
  }

  return formatter;
};
