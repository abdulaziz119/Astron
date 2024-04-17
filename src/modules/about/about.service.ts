import {
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import {Column, DeleteResult, Repository} from "typeorm";
import {
    PaginationParams,
    ParamIdDto,
    SingleResponse,
    AboutUpdateDto,
} from "./dto/about.dto";
import { MODELS } from "../../constants";
import { PaginationResponse } from "../../utils/pagination.response";
import { getPaginationResponse } from "../../utils/pagination.builder";
import {AboutEntity} from "../../entity/about.entity";

@Injectable()
export class AboutService {
    constructor(
        @Inject(MODELS.ABOUT)
        private readonly aboutRepo: Repository<AboutEntity>
    ) {}

    async findAll(
        payload: PaginationParams
    ): Promise<PaginationResponse<AboutEntity[]>> {
        const page = payload.page || 1;
        const limit = payload.limit || 10;
        const count = await this.aboutRepo.count();
        if (!count) return getPaginationResponse([], page, limit, count);
        const serverKeys = await this.aboutRepo.find({
            where: {},
            skip: (page - 1) * limit,
            take: limit,
        });
        if (limit && !isNaN(page))
            return getPaginationResponse<AboutEntity>(
                serverKeys,
                page,
                limit,
                count
            );
    }

    async findOne(
        body: ParamIdDto
    ): Promise<SingleResponse<AboutEntity>> {
        const { id } = body;
        try {
            const serverKeys = await this.aboutRepo.findOne({
                where: { id: id },
            });
            if (!serverKeys) {
                throw new NotFoundException(`Template with ID ${id} not found`);
            }
            return { result: serverKeys };
        } catch (error) {
            throw new HttpException(
                { message: `Failed get with ID ${id}`, error: error.detail },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async create(payload: any): Promise<SingleResponse<AboutEntity>> {
        const AboutModule = new AboutEntity();
        AboutModule.title = payload.title;
        AboutModule.text = payload.text;
        AboutModule.image = payload.image;
        try {
            return { result: await this.aboutRepo.save(AboutModule) };
        } catch (error) {
            throw new HttpException(
                {
                    message: "Failed to create a Template Portion",
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(
        payload: AboutUpdateDto
    ): Promise<SingleResponse<AboutEntity>> {
        const { id } = payload;

        const TemplatePortion = await this.aboutRepo.findOne({
            where: { id },
        });

        if (!TemplatePortion) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }
        try {
            Object.entries(TemplatePortion).forEach(([key, value]) => {
                TemplatePortion[key] = payload[key] || value;
            });
            return { result: await this.aboutRepo.save(TemplatePortion) };
        } catch (error) {
            throw new HttpException(
                {
                    message: "Failed to update the Template Portion",
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async delete(games: ParamIdDto): Promise<DeleteResult> {
        const { id } = games;
        return this.aboutRepo.softDelete(id);
    }
}
