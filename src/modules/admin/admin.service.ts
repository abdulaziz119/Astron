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
    AdminUpdateDto,
} from "./dto/admin.dto";
import { MODELS } from "../../constants";
import { PaginationResponse } from "../../utils/pagination.response";
import { getPaginationResponse } from "../../utils/pagination.builder";
import {AdminEntity} from "../../entity/admin.entity";

@Injectable()
export class AdminService {
    constructor(
        @Inject(MODELS.ABOUT)
        private readonly adminRepo: Repository<AdminEntity>
    ) {}

    async findAll(
        payload: PaginationParams
    ): Promise<PaginationResponse<AdminEntity[]>> {
        const page = payload.page || 1;
        const limit = payload.limit || 10;
        const count = await this.adminRepo.count();
        if (!count) return getPaginationResponse([], page, limit, count);
        const serverKeys = await this.adminRepo.find({
            where: {},
            skip: (page - 1) * limit,
            take: limit,
        });
        if (limit && !isNaN(page))
            return getPaginationResponse<AdminEntity>(
                serverKeys,
                page,
                limit,
                count
            );
    }

    async findOne(
        body: ParamIdDto
    ): Promise<SingleResponse<AdminEntity>> {
        const { id } = body;
        try {
            const serverKeys = await this.adminRepo.findOne({
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

    async create(payload: any): Promise<SingleResponse<AdminEntity>> {
        const AdminModule = new AdminEntity();
        AdminModule.first_name = payload.first_name;
        AdminModule.last_name = payload.last_name;
        AdminModule.phone = payload.phone;
        AdminModule.description = payload.description;
        try {
            return { result: await this.adminRepo.save(AdminModule) };
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
        payload: AdminUpdateDto
    ): Promise<SingleResponse<AdminEntity>> {
        const { id } = payload;

        const TemplatePortion = await this.adminRepo.findOne({
            where: { id },
        });

        if (!TemplatePortion) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }
        try {
            Object.entries(TemplatePortion).forEach(([key, value]) => {
                TemplatePortion[key] = payload[key] || value;
            });
            return { result: await this.adminRepo.save(TemplatePortion) };
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
        return this.adminRepo.softDelete(id);
    }
}
