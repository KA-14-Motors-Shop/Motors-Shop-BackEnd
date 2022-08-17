import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Advertisement } from "./advertisements.entity";

@Entity()
export class Image {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", width: 1500, nullable: false })
  url: string;

  @Column({ type: "boolean", nullable: false })
  is_front: boolean;

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

  @ManyToOne((type) => Advertisement, (advertisement) => advertisement.images, {
    onDelete: "CASCADE",
  })
  advertisement: Advertisement;
}
