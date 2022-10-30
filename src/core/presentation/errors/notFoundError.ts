class NotFoundError extends Error {
  constructor (object: string) {
    super(`${object} not found`);
    this.name = 'NotFoundError';
  }
}

export { NotFoundError };
