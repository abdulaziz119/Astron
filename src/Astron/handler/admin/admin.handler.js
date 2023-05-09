import jwt from "../../../common/utils/jwt.js";
import { createAdminService } from "../../../common/service/admin/admin.service.js";
export async function adminCreateHandler(request, response) {
  try {
    const data = request.body;
    const newAdmin = await createAdminService(data);
    return response.json({
      status: 200,
      message: "Ok",
      token: jwt.sign({ data: newAdmin }),
    });
  } catch (error) {
    response.json({
      status: 400,
      message: error.message,
    });
  }
}
