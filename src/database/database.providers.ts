import "reflect-metadata";
import {DataSource} from "typeorm";
import {DB_DB, DB_HOST, DB_PASS, DB_PORT, DB_USER,} from "../utils/env";
import {ASTRON_SOURCE} from "../constants";
import {AboutEntity} from "../entity/about.entity";
import {ContactEntity} from "../entity/contact.entity";
import {CoursesEntity} from "../entity/courses.entity";
import {TeachersEntity} from "../entity/teachers.entity";
export const databaseProviders = [
    {
        provide: ASTRON_SOURCE,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: "postgres",
                host: DB_HOST,
                port: DB_PORT,
                username: DB_USER,
                password: DB_PASS,
                database: DB_DB,
                synchronize: false,
                logging: false,
                schema: 'astron',
                entities: [
                    AboutEntity,
                    ContactEntity,
                    CoursesEntity,
                    TeachersEntity
                ],
                // extra: {
                //     timezone: "UTC",
                // },
            });
            await dataSource.initialize();
            return dataSource;
        },
    },
];

