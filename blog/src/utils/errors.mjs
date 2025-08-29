export class NotFoundError extends Error {
  status = 404;

  constructor(message = "Not Found") {
    super(message);
  }
}

export class UnAuthorizeError extends Error {
  status = 401;

  constructor(message = "Not Authorize") {
    super(message);
  }
}

export class ForbiddenError extends Error {
  status = 403;

  constructor(message = "ForbiddenError") {
    super(message);
  }
}

export class BadRequestError extends Error {
  status = 400;

  constructor(message = "Bad Request") {
    super(message);
  }
}
