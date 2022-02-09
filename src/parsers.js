import yaml from 'yaml-js';

const parseJson = (content) => JSON.parse(content);

const parseYaml = (content) => yaml.load(content);

const getParser = (extName) => {
  switch (extName) {
    case '.json':
      return parseJson;
    case '.yaml':
    case '.yml':
      return parseYaml;
    default:
      throw new Error(`unknown file extension: ${extName}`);
  }
};

export default (fileContent, extName) => getParser(extName)(fileContent);
