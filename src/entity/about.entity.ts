import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({
    name: 'about',
    synchronize: false,
})
export class AboutEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar" })
    title: string;

    @Column({ type: "varchar" })
    text: string;

    @Column({ type: "varchar" })
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}