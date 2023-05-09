import { Router } from "express";
const router = Router();

import { usersCreateHandler } from "../../handler/users/users.handler.js";

import { usersAnchovyValidation } from "../../middleware/users/users.validation.js";

router.post("/", usersAnchovyValidation, usersCreateHandler);
export default router;
