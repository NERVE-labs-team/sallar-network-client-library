/**
 * Exception returned when configuration given to `InstanceManager` constructor is invalid.
 */
export class InvalidUrlException extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidUrlException';
      Object.setPrototypeOf(this, InvalidUrlException.prototype);
    }
  }
  