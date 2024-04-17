import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class ParamIdDto {
    @IsDefined()
    id: number;
}

export class ContactCreateDto {
    @IsDefined()
    first_name: string;
    @IsDefined()
    phone_number: string;
}

export class ContactUpdateDto {
    @IsDefined()
    id: number;
    @IsOptional()
    @IsNotEmpty()
    first_name: string;
    @IsOptional()
    @IsNotEmpty()
    phone_number: string;
}

export class PaginationParams {
    @IsDefined()
    page: number;
    @IsDefined()
    limit: number;
}

export interface SingleResponse<T> {
    result: T;
}
