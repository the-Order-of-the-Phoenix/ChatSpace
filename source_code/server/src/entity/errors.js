class BaseError extends Error{
  constructor(code: Number = 0, message: String = 'some error occured') {
    super()
    this.code = code
    this.message = message
  }
}

export default BaseError