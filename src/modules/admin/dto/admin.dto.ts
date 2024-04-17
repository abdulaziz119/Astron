import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class ParamIdDto {
    @IsDefined()
    id: number;
}

export class AdminCreateDto {
    @IsDefined()
    first_name: string;
    @IsDefined()
    last_name: string;
    @IsOptional()
    phone: string;
    @IsOptional()
    description: string;
}

export class AdminUpdateDto {
    @IsDefined()
    id: number;
    @IsOptional()
    @IsNotEmpty()
    first_name: string;
    @IsOptional()
    @IsNotEmpty()
    last_name: string;
    @IsOptional()
    @IsNotEmpty()
    phone: string;
    @IsOptional()
    @IsNotEmpty()
    description: string;
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
