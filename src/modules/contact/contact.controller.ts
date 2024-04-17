import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PaginationResponse } from "../../utils/pagination.response";
import { DeleteResult } from "typeorm";
import {
    PaginationParams,
    ParamIdDto,
    SingleResponse,
    ContactUpdateDto,
    ContactCreateDto,
} from "./dto/contact.dto";
import {ContactService} from "./contact.service";
import {ContactEntity} from "../../entity/contact.entity";

@Controller("contact")
export class ContactController {
    constructor(
        private readonly contactService: ContactService
    ) {}

    @Post("/create")
    @HttpCode(201)
    async create(
        @Body() body: ContactCreateDto
    ): Promise<SingleResponse<ContactEntity>> {
        return this.contactService.create(body);
    }

    @Post("/findAll")
    @HttpCode(200)
    async findAll(
        @Body() body: PaginationParams
    ): Promise<PaginationResponse<ContactEntity[]>> {
        return this.contactService.findAll(body);
    }

    @Post("/findOne")
    @HttpCode(200)
    async findOne(
        @Body() body: ParamIdDto
    ): Promise<SingleResponse<ContactEntity>> {
        return this.contactService.findOne(body);
    }

    @Post("/update")
    @HttpCode(202)
    async update(
        @Body() body: ContactUpdateDto
    ): Promise<SingleResponse<ContactEntity>> {
        return this.contactService.update(body);
    }

    @Post("/remove")
    @HttpCode(204)
    async delete(@Body() body: ParamIdDto): Promise<DeleteResult> {
        return this.contactService.delete(body);
    }
}
