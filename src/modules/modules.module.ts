import { Module } from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {AboutModule} from "./about/about.module";
import {AdminModule} from "./admin/admin.module";

@Module({
    imports: [
        AboutModule,
        AdminModule,
        DatabaseModule,
    ],
})
export class ModulesModule {}
