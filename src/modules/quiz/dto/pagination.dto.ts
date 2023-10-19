import { IsNumber, IsMongoId, Min, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class Pagination {
    @IsOptional()
    @IsMongoId()
    lastId?: string

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 10
}
