import {
  deletedAt,
  deletedAtall,
  callAt,
  occupation,
} from "../base.service.js";
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
export async function checkUsersService(data) {
  try {
    const users = await usersModel.findOne({
      phone_number: data,
      deletedAt: "0",
    });
    if (users) {
      return users;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
export async function change_professionUsersService(data) {
  try {
    const users = await occupation(usersModel, data);
    if (!users) {
      throw new Error("user not found");
    } else {
      return users._id;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
export async function getUsersService(data) {
  try {
    const users = await usersModel.find(
      { call: data.call, deletedAt: "0" },
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

export async function deleteUsersAllByQueryService(id) {
  try {
    const deleted = await deletedAtall(usersModel, id);
    return deleted;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function callUsersByQueryService(id) {
  try {
    const call = await callAt(usersModel, id);
    if (!call) {
      throw new Error("user not found");
    } else {
      return call;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
