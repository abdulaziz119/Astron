import {
  createUsersService,
  checkUsersService,
  change_professionUsersService,
  getUsersService,
  deleteUsersByQueryService,
  deleteUsersAllByQueryService,
  callUsersByQueryService,
} from "../../../common/service/users/users.service.js";

export async function usersCreateHandler(request, response) {
  try {
    const data = request.body;
    let newUsers;
    const check = await checkUsersService(data.phone_number);
    if ((check, check.deletedAt === "0")) {
      newUsers = await change_professionUsersService(data);
    } else newUsers = await createUsersService(data);
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
    const data = request.params;
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

export async function usersAllDeleteHandler(request, response) {
  try {
    const data = request.body;
    const { _id } = data;
    for (let i of _id) {
      await deleteUsersAllByQueryService(i);
    }
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

export async function usersCallHandler(request, response) {
  try {
    const data = request.params._id;
    await callUsersByQueryService(data);
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
