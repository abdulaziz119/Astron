import { Router } from "express";
const router = Router();

import { adminCreateHandler } from "../../handler/admin/admin.handler.js";

router.post("/", adminCreateHandler);

export default router;
