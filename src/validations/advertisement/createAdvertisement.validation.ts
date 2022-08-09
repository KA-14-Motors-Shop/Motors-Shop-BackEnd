import * as yup from "yup";

const createAdvertisementSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        type: yup
          .mixed()
          .oneOf(["sale", "auction"])
          .required("type is required"),
        title: yup.string().required("title is required"),
        year: yup.number().min(1870).required("year is required"),
        mileage: yup.number().min(0).required("mileage is required"),
        price: yup.number().min(0).required("price is required"),
        description: yup.string().required("description is required"),
        vehicle_type: yup
          .mixed()
          .oneOf(["car", "motorcycle"])
          .required("vehicle type is required"),
        is_active: yup.boolean().required("is active is required"),
        images: yup.array().required("at least one image is required"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
};

export default createAdvertisementSchema;
