import _ from 'lodash';

const getValue = (data, key) => data[key];

const getKeys = (data1, data2) => {
  const allKeys = _.sortBy([...Object.keys(data1), ...Object.keys(data2)]);
  const keys = _.sortedUniq(allKeys);

  return keys;
};

const isNested = (obj1, obj2) => _.isPlainObject(obj1) && _.isPlainObject(obj2);

const getNode = (value1, value2, key) => {
  if (typeof value1 === 'undefined') {
    return { type: 'added', key, value: value2 };
  }

  if (typeof value2 === 'undefined') {
    return { type: 'removed', key, value: value1 };
  }

  if (value1 === value2) {
    return { type: 'notChanged', key, value: value1 };
  }

  return {
    type: 'changed',
    key,
    value: value2,
    oldValue: value1,
  };
};

const buildDiff = (data1, data2) => {
  const iter = (item1, item2) => {
    const keys = getKeys(item1, item2);

    return keys.flatMap((key) => {
      const value1 = getValue(item1, key);
      const value2 = getValue(item2, key);

      if (isNested(value1, value2)) {
        return { type: 'nested', key, children: iter(value1, value2) };
      }

      return getNode(value1, value2, key);
    });
  };

  return { type: 'root', children: iter(data1, data2) };
};

export default buildDiff;
