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
    ContactUpdateDto,
} from "./dto/contact.dto";
import { MODELS } from "../../constants";
import { PaginationResponse } from "../../utils/pagination.response";
import { getPaginationResponse } from "../../utils/pagination.builder";
import {ContactEntity} from "../../entity/contact.entity";

@Injectable()
export class ContactService {
    constructor(
        @Inject(MODELS.ABOUT)
        private readonly contactRepo: Repository<ContactEntity>
    ) {}

    async findAll(
        payload: PaginationParams
    ): Promise<PaginationResponse<ContactEntity[]>> {
        const page = payload.page || 1;
        const limit = payload.limit || 10;
        const count = await this.contactRepo.count();
        if (!count) return getPaginationResponse([], page, limit, count);
        const serverKeys = await this.contactRepo.find({
            where: {},
            skip: (page - 1) * limit,
            take: limit,
        });
        if (limit && !isNaN(page))
            return getPaginationResponse<ContactEntity>(
                serverKeys,
                page,
                limit,
                count
            );
    }

    async findOne(
        body: ParamIdDto
    ): Promise<SingleResponse<ContactEntity>> {
        const { id } = body;
        try {
            const serverKeys = await this.contactRepo.findOne({
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

    async create(payload: any): Promise<SingleResponse<ContactEntity>> {
        const AdminModule = new ContactEntity();
        AdminModule.first_name = payload.first_name;
        AdminModule.phone_number = payload.phone_number;
        try {
            return { result: await this.contactRepo.save(AdminModule) };
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
        payload: ContactUpdateDto
    ): Promise<SingleResponse<ContactEntity>> {
        const { id } = payload;

        const TemplatePortion = await this.contactRepo.findOne({
            where: { id },
        });

        if (!TemplatePortion) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }
        try {
            Object.entries(TemplatePortion).forEach(([key, value]) => {
                TemplatePortion[key] = payload[key] || value;
            });
            return { result: await this.contactRepo.save(TemplatePortion) };
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
        return this.contactRepo.softDelete(id);
    }
}
