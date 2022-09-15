import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Address } from "./addresses.entity";
import { Advertisement } from "./advertisements.entity";
import { Exclude } from "class-transformer";
import { Comment } from "./comments.entity";

export enum UserType {
  BUYER = "buyer",
  ADVERTISER = "advertiser",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", width: 256, nullable: false })
  name: string;

  @Column({ type: "varchar", width: 256, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", width: 11, nullable: false, unique: true })
  cpf: string;

  @Column({ type: "varchar", width: 11, nullable: false, unique: true })
  cell_phone: string;

  @Column({ type: "date" })
  birthday: string;

  @Exclude()
  @Column({ type: "varchar", width: 256, nullable: false })
  password: string;

  @Column({ type: "varchar", width: 500 })
  description: string;

  @Column({ type: "enum", enum: UserType, default: UserType.BUYER })
  type: UserType;

  @Column({ type: "boolean", nullable: false })
  is_active: boolean;

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

  @OneToOne((type) => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @OneToMany((type) => Advertisement, (advertisement) => advertisement.owner, {
    eager: true,
  })
  advertisements: Advertisement[];

  @OneToMany((type) => Comment, (comment) => comment.user, { eager: true })
  comments: Comment[];
}
