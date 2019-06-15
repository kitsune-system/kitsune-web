import _ from 'lodash';
import React from 'react';
import screenfull from 'screenfull';

import Icon from '../../components/icon';
import { bind } from '../../core/rules';
import Split from '../../core/split';
import { requests } from '../requests';
import { rules, appRules } from '../rules';
import action from '../store/actions';

import command from './commands';
import kitsuneService from '../kitsune-service';

const { newNode, selectPrevNode, selectNextNode, writeString } = action;

export const prevent = e => {
  e.preventDefault();
  return e;
};

export const ignore = () => {};

const commandInput = () => requests.add('command', { header: <Icon type="terminal"/> }).then(cmdStr => {
  command(cmdStr);
}, ignore);

const bodySplit = Split();
const { add } = bodySplit;

add(rules('simpleKey !shift !ctrl !alt !meta', commandInput));
add(rules('backtick !shift !ctrl !alt !meta', prevent, commandInput));

add(rules('f shift', () => screenfull.enabled && screenfull.toggle(document.body)));

add(rules('n shift', newNode));
add(rules('s shift', prevent, () => {
  requests.add('string', { header: <Icon type="search"/> }).then(string => {
    kitsuneService.searchStrings(string).then(strings => _.map(strings, writeString), ignore);
  });
}));

add(rules('down', selectPrevNode));
add(rules('up', selectNextNode));

add(rules('space !shift !alt', prevent, () => {
  requests.add('string', { header: <Icon type="quote-right"/> }).then(string => {
    writeString(string);
  }, ignore);
}));

add(rules('space shift !alt', prevent, () => {
  requests.add('text', { header: <Icon type="file-text-o"/> }).then(string => {
    writeString(string);
  }, ignore);
}));

const keySplit = Split();
keySplit.add(rules('space alt', () => document.activeElement.blur()));
keySplit.add(bind(appRules.bodyFocus, bodySplit));

export default keySplit;
