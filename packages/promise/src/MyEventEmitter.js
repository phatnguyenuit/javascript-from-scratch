class MyEventEmitter {
  /**
   * Constructor
   */
  constructor() {
    /**
     * @type {Record<string|symbol, ((...data: any[]) => void)[]>}
     */
    this.listeners = {};
  }

  /**
   * Add event listener
   * @param {string|symbol} event
   * @param {((data: any) => void)} listener
   */
  addEventListener(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
    return this;
  }

  /**
   * on event alias for "addEventListener"
   * @param {string|symbol} event
   * @param {((data: any) => void)} listener
   * @returns {MyEventEmitter} emitter
   */
  on(event, listener) {
    return this.addEventListener(event, listener);
  }

  /**
   * Only listen $event once
   * @param {string|symbol} event
   * @param {((data: any) => void)} listener
   * @returns {MyEventEmitter} emitter
   */
  once(event, listener) {
    const onceListener = (...args) => {
      listener.apply(null, args);
      this.removeEventListener(event, onceListener);
    };
    return this.addEventListener(event, onceListener);
  }

  /**
   * Remove event listener
   * @param {string|symbol} event
   * @param {((data: any) => void)} listener
   */
  removeEventListener(event, listener) {
    if (!this.listeners[event]) return this;

    const idx = this.listeners[event].indexOf(listener);
    if (idx !== -1) {
      this.listeners[event].splice(idx, 1);
    }

    return this;
  }

  /**
   * Emit data
   * @param {string|symbol} event
   * @param {...any} data
   * @returns {boolean} result - 'true' if $event had $listeners, 'false' otherwise
   */
  emit(event, ...args) {
    if (!this.listeners[event]) {
      return false;
    }
    this.listeners[event].forEach(listener => listener(...args));
    return true;
  }
}

module.exports = MyEventEmitter;
