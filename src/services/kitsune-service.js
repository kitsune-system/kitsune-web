const RANDOM = '456f47d1ebec9fdbf64cf941dd399c36c06e24e71014a08cd6dd67ca03d44966';
const TO_JSON = '2d3525e869f5884c5a2e9fe3e0fa90bd314cc63684f179efe7b9dab929a24b01';
const WRITE_STRING = 'fc9b664949f9da76c96475cd50578b8755070a060923bafe2e4fe2252275dbb1';

// Compound node ids
const SEARCH_STRING = 'a0225ff71229f55c76d7f7b65c32da14f37327c7cd6d773e8af47e162d179894';

const path = parts => {
  return parts.join('/');
};

const KitsuneService = request => {
  const post = (parts, data) => request.post(path(parts), data);

  const random = () => post([RANDOM]);
  const searchStrings = pattern => post([SEARCH_STRING, TO_JSON], pattern);
  const writeString = str => post([WRITE_STRING], str);

  return {
    random,
    searchStrings,
    writeString
  };
};

export default KitsuneService;
