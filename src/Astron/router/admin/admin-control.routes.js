import { Router } from "express";
const router = Router();

import {
  usersGetHandler,
  usersDeleteHandler,
  usersAllDeleteHandler,
  usersCallHandler,
} from "../../handler/users/users.handler.js";

router.get("/users/:call", usersGetHandler);
router.delete("/:_id", usersDeleteHandler);
router.delete("/delete/all", usersAllDeleteHandler);
router.put("/called/:_id", usersCallHandler);

export default router;
