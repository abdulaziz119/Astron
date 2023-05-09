import { Router } from "express";
const router = Router();

import {
  usersGetHandler,
  usersDeleteHandler,
} from "../../handler/users/users.handler.js";

router.get("/users", usersGetHandler);
router.delete("/:_id", usersDeleteHandler);

export default router;
