import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({
    name: 'teachers',
    synchronize: false,
})
export class TeachersEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    first_name: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    last_name: string;

    @Column({ type: "varchar" })
    image: string;

    @Column({ type: "varchar" })
    phone: string;

    @Column({type: 'jsonb', nullable: true})
    language: string;

    @Column({type:"varchar"})
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}