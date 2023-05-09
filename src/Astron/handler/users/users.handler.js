import {
  createUsersService,
  getUsersService,
  deleteUsersByQueryService,
} from "../../../common/service/users/users.service.js";

export async function usersCreateHandler(request, response) {
  try {
    const data = request.body;
    const newUsers = await createUsersService(data);
    return response.json({
      status: 200,
      message: "Ok",
      data: newUsers,
    });
  } catch (error) {
    response.json({
      status: 400,
      message: error.message,
    });
  }
}

export async function usersGetHandler(request, response) {
  try {
    const data = request.body;
    const teacher = await getUsersService(data);
    return response.json({
      status: 200,
      message: "Ok",
      data: teacher,
    });
  } catch (error) {
    response.json({
      status: 400,
      message: error.message,
    });
  }
}

export async function usersDeleteHandler(request, response) {
  try {
    const data = request.params._id;
    await deleteUsersByQueryService(data);
    return response.json({
      status: 200,
      message: "ok",
      data: data,
    });
  } catch (error) {
    response.json({
      status: 400,
      message: error.message,
    });
  }
}
