import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Image } from "./images.entity";
import { User } from "./users.entity";

export enum AdvertisementType {
  SALE = "sale",
  AUCTION = "auction",
}

export enum VehicleType {
  CAR = "car",
  MOTORCYCLE = "motorcycle",
}

@Entity()
export class Advertisement {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({
    type: "enum",
    enum: AdvertisementType,
    default: AdvertisementType.SALE,
  })
  type: AdvertisementType;

  @Column({ type: "varchar", width: 256, nullable: false })
  title: string;

  @Column({ type: "integer", nullable: false })
  year: number;

  @Column({ type: "integer", nullable: false })
  mileage: number;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: false })
  price: number;

  @Column({ type: "varchar", width: 500, nullable: false })
  description: string;

  @Column({ type: "enum", enum: VehicleType, default: VehicleType.CAR })
  vehicle_type: VehicleType;

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

  @ManyToOne((type) => User, (user) => user.advertisements, {
    onDelete: "CASCADE",
  })
  owner: User;

  @OneToMany((type) => Image, (image) => image.advertisement, { eager: true })
  images: Image[];
}
