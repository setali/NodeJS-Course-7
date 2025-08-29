import { ROLE_HIERARCHY } from "../config/roles.mjs";
import { ForbiddenError, UnAuthorizeError } from "../utils/errors.mjs";

export default function acl(roleName) {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnAuthorizeError();
    }

    const { role } = req.user;

    if (role === roleName || ROLE_HIERARCHY[role].includes(roleName)) {
      return next();
    }

    throw new ForbiddenError();
  };
}
