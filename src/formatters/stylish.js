import _ from 'lodash';

const spacesCount = 4;

const indent = (depth) => (' ').repeat(depth * spacesCount - 2);

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

const stylish = (diff, depth = 0) => {
  switch (diff.type) {
    case 'root': {
      const lines = diff.children
        .flatMap((node) => stylish(node, depth + 1))
        .join('\n');

      return `{\n${lines}\n}`;
    }
    case 'added': {
      return `${indent(depth)}+ ${diff.key}: ${stringify(diff.value, depth)}`;
    }
    case 'removed':
      return `${indent(depth)}- ${diff.key}: ${stringify(diff.value, depth)}`;
    case 'changed': {
      const line1 = `${indent(depth)}- ${diff.key}: ${stringify(diff.oldValue, depth)}`;
      const line2 = `${indent(depth)}+ ${diff.key}: ${stringify(diff.value, depth)}`;
      return `${line1}\n${line2}`;
    }
    case 'notChanged':
      return `${indent(depth)}  ${diff.key}: ${stringify(diff.value, depth + 1)}`;
    case 'node': {
      const lines = diff.children
        .flatMap((node) => stylish(node, depth + 1))
        .join('\n');

      return `${indent(depth)}  ${diff.key}: {\n${lines}\n  ${indent(depth)}}`;
    }
    default:
      throw new Error('unknown type');
  }
};

export default stylish;
