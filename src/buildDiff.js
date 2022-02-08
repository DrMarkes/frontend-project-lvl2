import _ from 'lodash';

const getValue = (data, key) => data[key];

const buildDiff = (data1, data2) => {
  const iter = (item1, item2) => {
    const allKeys = _.sortBy([...Object.keys(item1), ...Object.keys(item2)]);
    const keys = _.sortedUniq(allKeys);

    return keys.flatMap((key) => {
      const value1 = getValue(item1, key);
      const value2 = getValue(item2, key);

      if (!_.has(item1, key)) {
        return { type: 'added', key, value: value2 };
      }

      if (!_.has(item2, key)) {
        return { type: 'removed', key, value: value1 };
      }

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return { type: 'node', key, children: iter(value1, value2) };
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
    });
  };

  return { type: 'root', children: iter(data1, data2) };
};

export default buildDiff;
