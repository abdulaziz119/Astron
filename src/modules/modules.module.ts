import { Module } from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {AboutModule} from "./about/about.module";
import {AdminModule} from "./admin/admin.module";
import {ContactModule} from "./contact/contact.module";

@Module({
    imports: [
        ContactModule,
        AboutModule,
        AdminModule,
        DatabaseModule,
    ],
})
export class ModulesModule {}
