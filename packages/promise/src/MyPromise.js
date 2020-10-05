class MyPromise {
  /**
   * constructor
   * @param {(resolve: function, reject?: function) => void} executor
   */
  constructor(executor) {
    this.state = 'pending';
    this.promiseValue = undefined;
    /**
     * @type {((data: any) => any)[]}
     */
    this.resolvedListeners = [];

    this.handleError = () => {};
    this.handleFinally = () => {};
    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    setTimeout(() => {
      executor(this.onResolve, this.onReject);
    });
  }

  onResolve(value) {
    this.state = 'fulfilled';
    this.promiseValue = value;
    let result = value;
    try {
      this.resolvedListeners.forEach(listener => {
        result = listener(result);
      });
      this.handleFinally();

      // reset
      this.handleFinally = () => {};
      this.handleError = () => {};
    } catch (error) {
      this.onReject(error);
    } finally {
      this.resolvedListeners = [];
    }
  }

  onReject(error) {
    this.state = 'rejected';
    this.promiseValue = error;

    this.handleError(error);
    this.handleFinally();

    // reset
    this.handleFinally = () => {};
    this.handleError = () => {};
  }

  /**
   * Then
   * @param {(data: any) => any} handleSuccess
   * TODO: Fix then when promise is fulfilled
   */
  then(handleSuccess) {
    if (this.state === 'fulfilled') {
      return new Promise(resolve => resolve(this.promiseValue)).then(
        handleSuccess,
      );
    } else {
      this.resolvedListeners.push(handleSuccess);
    }
    return this;
  }

  catch(handleError) {
    if (this.state === 'rejected') {
      return new Promise((_, reject) => reject(this.promiseValue)).catch(
        handleError,
      );
    } else {
      this.handleError = handleError;
    }
    return this;
  }

  finally(handleFinally) {
    this.handleFinally = handleFinally;
  }
}

module.exports = MyPromise;
