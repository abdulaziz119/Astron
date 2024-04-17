import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import {aboutProviders} from "./about.providers";
import {AboutService} from "./about.service";
import {AboutController} from "./about.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [AboutController],
    providers: [...aboutProviders, AboutService],
})
export class AboutModule {}
