import { Types } from "mongoose";

export async function deletedAt(model, id) {
  try {
    id = new Types.ObjectId(id);
    return model.updateOne({ _id: id }, { deletedAt: new Date() });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deletedAtall(model, id) {
  try {
    id = new Types.ObjectId(id);
    return model.updateMany({ _id: id }, { deletedAt: new Date() });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function callAt(model, id) {
  try {
    id = new Types.ObjectId(id);
    return model.findOneAndUpdate({ _id: id, deletedAt: "0" }, { call: false });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function occupation(model, data) {
  try {
    const { phone_number, occupation } = data;
    return model.findOneAndUpdate(
      { phone_number: phone_number, deletedAt: "0" },
      { occupation: occupation }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}
