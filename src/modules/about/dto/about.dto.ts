import { IsDefined, IsNotEmpty, IsOptional } from "class-validator";

export class ParamIdDto {
    @IsDefined()
    id: number;
}

export class AboutCreateDto {
    @IsDefined()
    title: string;
    @IsDefined()
    text: string;
    @IsOptional()
    image: string;
}

export class AboutUpdateDto {
    @IsDefined()
    id: number;
    @IsOptional()
    @IsNotEmpty()
    title: string;
    @IsOptional()
    @IsNotEmpty()
    text: string;
    @IsOptional()
    @IsNotEmpty()
    image: string;
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
