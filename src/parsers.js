import yaml from 'yaml-js';

const parseJson = (content) => JSON.parse(content);

const parseYaml = (content) => yaml.load(content);

const getParser = (content, formatFile) => {
  let parse;
  if (formatFile === '.json') {
    parse = parseJson;
  }

  if (formatFile === '.yaml' || formatFile === '.yml') {
    parse = parseYaml;
  }

  return parse(content);
};

export default (content, formatFile) => getParser(content, formatFile);
