import _ from 'lodash';

const spacesCount = 4;

const indent = (depth) => ' '.repeat(depth * spacesCount - 2);

const stringify = (node, depth) => {
  if (!_.isObject(node)) {
    return String(node);
  }

  const lines = _.sortBy(Object.entries(node)).flatMap(([key, value]) => {
    const result = `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`;

    return result;
  });

  return `{\n${lines.join('\n')}\n  ${indent(depth)}}`;
};

const getLine = (key, value, depth, replacer) => `${indent(depth)}${replacer}${key}: ${stringify(value, depth)}`;

const stylish = (diff, depth = 0) => {
  const getChildren = (children) => children
    .flatMap((child) => stylish(child, depth + 1)).join('\n');

  switch (diff.type) {
    case 'root': {
      const lines = getChildren(diff.children);
      return `{\n${lines}\n}`;
    }
    case 'nested': {
      const lines = getChildren(diff.children);
      return `${indent(depth)}  ${diff.key}: {\n${lines}\n  ${indent(depth)}}`;
    }
    case 'added': {
      return getLine(diff.key, diff.value, depth, '+ ');
    }
    case 'removed':
      return getLine(diff.key, diff.value, depth, '- ');
    case 'changed': {
      const line1 = getLine(diff.key, diff.oldValue, depth, '- ');
      const line2 = getLine(diff.key, diff.value, depth, '+ ');
      return `${line1}\n${line2}`;
    }
    case 'notChanged':
      return getLine(diff.key, diff.value, depth, '  ');
    default:
      throw new Error('unknown type');
  }
};

export default stylish;
