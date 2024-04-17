import { MODELS, ASTRON_SOURCE } from "../../constants";
import { DataSource } from "typeorm";
import {AboutEntity} from "../../entity/about.entity";

export const adminProviders = [
    {
        provide: MODELS.ABOUT,
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(AboutEntity),
        inject: [ASTRON_SOURCE],
    },
];
