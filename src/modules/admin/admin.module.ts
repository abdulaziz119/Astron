import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import {adminProviders} from "./admin.providers";
import {AdminController} from "./admin.controller";
import {AdminService} from "./admin.service";

@Module({
    imports: [DatabaseModule],
    controllers: [AdminController],
    providers: [...adminProviders, AdminService],
})
export class AdminModule {}
