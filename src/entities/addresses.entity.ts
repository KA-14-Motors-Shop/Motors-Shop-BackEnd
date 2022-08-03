import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", width: 8, nullable: false })
  cep: string;

  @Column({ type: "varchar", width: 256, nullable: false })
  state: string;

  @Column({ type: "varchar", width: 256, nullable: false })
  city: string;

  @Column({ type: "varchar", width: 256, nullable: false })
  street: string;

  @Column({ type: "integer", nullable: false })
  number: number;

  @Column({ type: "varchar", width: 256 })
  complement: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
  })
  updatedAt: Date;
}
