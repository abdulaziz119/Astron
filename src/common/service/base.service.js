import { Types } from "mongoose";

export async function findById(model, id) {
  try {
    const query = { _id: new Types.ObjectId(id), deletedAt: 0 };
    return model.find(query);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deletedAt(model, id) {
  try {
    id = new Types.ObjectId(id);
    return model.updateOne({ _id: id }, { deletedAt: new Date() });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
