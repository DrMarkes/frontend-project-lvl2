import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (diff, path = '') => {
  switch (diff.type) {
    case 'root':
      return diff.children
        .flatMap((child) => plain(child, `${child.key}`))
        .join('\n');
    case 'nested':
      return diff.children
        .flatMap((child) => plain(child, `${path}.${child.key}`))
        .join('\n');
    case 'added':
      return `Property '${path}' was added with value: ${getValue(diff.value)}`;
    case 'removed':
      return `Property '${path}' was removed`;
    case 'changed':
      return `Property '${path}' was updated. From ${getValue(diff.oldValue)} to ${getValue(diff.value)}`;
    default:
      return [];
  }
};

export default plain;
