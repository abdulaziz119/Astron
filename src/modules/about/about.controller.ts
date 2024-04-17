import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PaginationResponse } from "../../utils/pagination.response";
import { DeleteResult } from "typeorm";
import {
    PaginationParams,
    ParamIdDto,
    SingleResponse,
    AboutUpdateDto,
    AboutCreateDto,
} from "./dto/about.dto";
import {AboutEntity} from "../../entity/about.entity";
import {AboutService} from "./about.service";

@Controller("about")
export class AboutController {
    constructor(
        private readonly aboutService: AboutService
    ) {}

    @Post("/create")
    @HttpCode(201)
    async create(
        @Body() body: AboutCreateDto
    ): Promise<SingleResponse<AboutEntity>> {
        return this.aboutService.create(body);
    }

    @Post("/findAll")
    @HttpCode(200)
    async findAll(
        @Body() body: PaginationParams
    ): Promise<PaginationResponse<AboutEntity[]>> {
        return this.aboutService.findAll(body);
    }

    @Post("/findOne")
    @HttpCode(200)
    async findOne(
        @Body() body: ParamIdDto
    ): Promise<SingleResponse<AboutEntity>> {
        return this.aboutService.findOne(body);
    }

    @Post("/update")
    @HttpCode(202)
    async update(
        @Body() body: AboutUpdateDto
    ): Promise<SingleResponse<AboutEntity>> {
        return this.aboutService.update(body);
    }

    @Post("/remove")
    @HttpCode(204)
    async delete(@Body() body: ParamIdDto): Promise<DeleteResult> {
        return this.aboutService.delete(body);
    }
}
