const MyEventEmitter = require('../MyEventEmitter');

const eventEmitter = new MyEventEmitter();

const listenerOnce = data => console.log('listenerOnce =>', data);
const listener = data => console.log('listener =>', data);
const listener2 = data => console.log('listener_2 =>', data);
const listener3 = data => console.log('listener_3 =>', data);

eventEmitter.once('greet', listenerOnce);

eventEmitter.addEventListener('greet', listener);
eventEmitter.addEventListener('greet', listener2);
eventEmitter.addEventListener('greet', listener3);

eventEmitter.emit('greet', 'Hello');
eventEmitter.removeEventListener('greet', listener);

eventEmitter.emit('greet', 'Hi there!');
eventEmitter.removeEventListener('greet', listener2);

eventEmitter.emit('greet', 'Done');
eventEmitter.removeEventListener('greet', listener3);
