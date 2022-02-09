import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './jsonFormatter.js';

export default (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return jsonFormatter;
    default:
      throw new Error(`unknown format type: ${formatName}`);
  }
};
