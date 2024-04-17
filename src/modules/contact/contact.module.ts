import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import {ContactService} from "./contact.service";
import {ContactController} from "./contact.controller";
import {contactProviders} from "./contact.providers";
@Module({
    imports: [DatabaseModule],
    controllers: [ContactController],
    providers: [...contactProviders, ContactService],
})
export class ContactModule {}
