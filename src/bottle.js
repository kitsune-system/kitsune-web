import Bottle from 'bottlejs';
import KitsuneService from './app/kitsune-service';

const bottle = new Bottle();

bottle.factory('actions', require('./app/actions').default);
bottle.factory('kitsuneService', () => KitsuneService('http://localhost:9292/'));
bottle.factory('keySwitch', require('./app/key-switch-factory').default);
bottle.factory('store', require('./app/store').default);

bottle.factory('Console', require('./app/console').default);
bottle.factory('Entry', require('./app/entry').default);

export default bottle;
