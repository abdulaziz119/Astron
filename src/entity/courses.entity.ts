import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({
    name: 'courses',
    synchronize: false,
})
export class CoursesEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar" })
    science: string;

    @Column({ type: "integer" })
    students: number;

    @Column({ type: "integer" })
    price: number;

    @Column({ type: "integer" })
    teacher_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
