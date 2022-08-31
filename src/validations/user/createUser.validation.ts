import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
export const createUserSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("name is a required field."),
        cpf: yup.string().required("cpf is a required field."),
        email: yup.string().required("email is a required field."),
        password: yup.string().required("password is a required field."),
        description: yup.string().required("description is a required field."),
        cell_phone: yup.string().required("cell_phone is a required field."),
        birthday: yup.string().required("birthday is a required field."),
        type: yup.string().required("user type is a required field."),
      }),
      validationsOptions: {
        abortEarly: false,
      },
    },
  },
};

export const addressSchemaValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = yup.object().shape({
      cep: yup.string().required("cep is a required field."),
      state: yup.string().required("state is a required field."),
      city: yup.string().required("city is a required field."),
      street: yup.string().required("street is a required field."),
      number: yup.number().required("number is a required field."),
      complement: yup.string().required("complement is a required field."),
    });

    await schema.validate(req.body.address, { abortEarly: false });

    return next();
  } catch (err: any) {
    const errors = err.errors;
    return res.status(400).json({ errors });
  }
};
