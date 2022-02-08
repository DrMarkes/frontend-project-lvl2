import yaml from 'yaml-js';

const parseJson = (content) => JSON.parse(content);

const parseYaml = (content) => yaml.load(content);

const getParser = (extName) => {
  let parse;
  if (extName === '.json') {
    parse = parseJson;
  }

  if (extName === '.yaml' || extName === '.yml') {
    parse = parseYaml;
  }

  return parse;
};

export default (fileContent, extName) => getParser(extName)(fileContent);
