import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Advertisement } from "./advertisements.entity";
import { User } from "./users.entity";

export enum CommentAdType {
  SALE = "sale",
  AUCTION = "auction",
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: CommentAdType, nullable: false })
  type: CommentAdType;

  @Column({ type: "varchar", width: 1500, nullable: false })
  value: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  createdAt: Date;

  @ManyToOne(
    (type) => Advertisement,
    (advertisement) => advertisement.comments,
    {
      onDelete: "CASCADE",
    }
  )
  advertisement: Advertisement;

  @ManyToOne((type) => User, (user) => user.comments, {
    onDelete: "CASCADE",
  })
  user: User;
}
