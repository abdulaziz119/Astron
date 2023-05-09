import { Types } from "mongoose";
import { deletedAt } from "../base.service.js";
import usersModel from "../../db/model/users/users.model.js";

export async function createUsersService(data) {
  try {
    const users = await usersModel.create(data);
    return users._id;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
export async function getUsersService() {
  try {
    const users = await usersModel.find(
      { deletedAt: "0" },
      { deletedAt: 0, __v: 0 }
    );
    return users;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function deleteUsersByQueryService(id) {
  try {
    const deleted = await deletedAt(usersModel, id);
    return deleted;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
