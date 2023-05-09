import { Types } from "mongoose";
import { authUsersByQueryService } from "../../../common/service/users/users.service.js";
import jwt from "../../../common/utils/jwt.js";
export default async function authToken(request, response, next) {
  try {
    let usersId = jwt.verify(request.headers.token);
    usersId._id = new Types.ObjectId(usersId._id);
    const { _id } = usersId;
    let users = await authUsersByQueryService({ _id: _id });
    if (!users) {
      throw new Error("user not found");
    }
    request.users = users;
    next();
  } catch (error) {
    return response.json({
      status: 401,
      message: error.message,
    });
  }
}
