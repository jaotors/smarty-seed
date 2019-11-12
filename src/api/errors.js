class FetchError extends Error {
  constructor(
    statusText = 'FetchError',
    { status, ...errorDetails },
    ...params
  ) {
    // statusText is your error.message
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...[statusText, ...params]);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    // Custom debugging information
    this.status = status;

    for (let key in errorDetails) {
      this[key] = errorDetails[key];
    }
  }
}

export { FetchError };
