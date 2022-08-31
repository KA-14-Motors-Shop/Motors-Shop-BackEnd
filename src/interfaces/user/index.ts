import { UserType } from "../../entities/users.entity";

export interface UserCreationParams {
  name: string;
  cpf: string;
  email: string;
  password: string;
  description: string;
  cell_phone: string;
  birthday: string;
  type: UserType;
  address: AddresCreationParams;
}

export interface AddresCreationParams {
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement: string;
}

export interface UserLoginParams {
  email: string;
  password: string;
}

export interface UserUpdateParams {
  name: string;
  cpf: string;
  email: string;
  password: string;
  description: string;
  cell_phone: string;
  birthday: string;
  address: AddresCreationParams;
  id: string;
}
