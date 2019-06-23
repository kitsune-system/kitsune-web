import { pipe } from '.';

export const bind = (rule, action, defaultResult) => {
  return (...args) => {
    return rule(...args) ? action(...args) : defaultResult;
  };
};

export const intersect = rules => {
  return (...args) => rules.every(rule => rule(...args));
};

export const union = rules => {
  return (...args) => rules.some(rule => rule(...args));
};

export const not = rule => {
  return (...args) => !rule(...args);
};

export const rules = {
  all: () => true,
  none: () => false
};

const strToRule = rules => str => {
  let name = str;
  let negate = false;

  if(str[0] === '!') {
    name = str.slice(1);
    negate = true;
  }

  if(!(name in rules))
    throw new Error(`No such rule found: ${name}`);

  let rule = rules[name];
  if(negate)
    rule = not(rule);

  return rule;
};

const strToRules = strToRule => str => {
  const ruleNames = str.split(' ');
  return ruleNames.map(strToRule);
};

export const Rules = rulesSrc => {
  const rules = { ...rulesSrc };
  const strToRulesFn = strToRules(strToRule(rules));

  const result = (ruleStr, ...actions) => {
    const ruleList = strToRulesFn(ruleStr);
    let rule = intersect(ruleList);

    if(actions.length) {
      const action = actions.length === 1 ? actions[0] : pipe(...actions);
      rule = bind(rule, action);
    }

    return rule;
  };

  result.union = (ruleStr, name) => {
    const ruleList = strToRulesFn(ruleStr);
    const unionRule = union(ruleList);

    if(name)
      rules[name] = unionRule;

    return unionRule;
  };

  return result;
};
