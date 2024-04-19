import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModals.js";
import { checkToken } from "../services/jwtServices.js";

export const protect = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  try {
    const userId = checkToken(token);
    if (!userId) throw HttpError(401, "Unauthorized..");

    const currentUser = await User.findById(userId);
    if (!currentUser || !currentUser.token || currentUser.token !== token)
      throw HttpError(401, "Unauthorized..");

    req.user = currentUser;

    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};
