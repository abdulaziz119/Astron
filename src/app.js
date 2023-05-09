import express from "express";
import ENV from "./common/config.js";
import ConnectDb from "./common/db/connect.db.js";
import AdminRoutes from "./Astron/router/admin/admin.routes.js";
import Admin_controlRouters from "./Astron/router/admin/admin-control.routes.js";
import UsersRoutes from "./Astron/router/users/users.routes.js";

const app = new express();

app.use(express.json());

app.use("/admin", AdminRoutes);
app.use("/admin-control", Admin_controlRouters);
app.use("/users", UsersRoutes);
async function start() {
  console.log("server is running");
  ConnectDb();
}

app.listen(ENV.PORT, start());
