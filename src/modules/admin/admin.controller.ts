import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PaginationResponse } from "../../utils/pagination.response";
import { DeleteResult } from "typeorm";
import {
    PaginationParams,
    ParamIdDto,
    SingleResponse,
    AdminUpdateDto,
    AdminCreateDto,
} from "./dto/admin.dto";
import {AdminService} from "./admin.service";
import {AdminEntity} from "../../entity/admin.entity";

@Controller("admin")
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {}

    @Post("/create")
    @HttpCode(201)
    async create(
        @Body() body: AdminCreateDto
    ): Promise<SingleResponse<AdminEntity>> {
        return this.adminService.create(body);
    }

    @Post("/findAll")
    @HttpCode(200)
    async findAll(
        @Body() body: PaginationParams
    ): Promise<PaginationResponse<AdminEntity[]>> {
        return this.adminService.findAll(body);
    }

    @Post("/findOne")
    @HttpCode(200)
    async findOne(
        @Body() body: ParamIdDto
    ): Promise<SingleResponse<AdminEntity>> {
        return this.adminService.findOne(body);
    }

    @Post("/update")
    @HttpCode(202)
    async update(
        @Body() body: AdminUpdateDto
    ): Promise<SingleResponse<AdminEntity>> {
        return this.adminService.update(body);
    }

    @Post("/remove")
    @HttpCode(204)
    async delete(@Body() body: ParamIdDto): Promise<DeleteResult> {
        return this.adminService.delete(body);
    }
}
