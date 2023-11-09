export type CategoryResponse = {
  _id: string;
  name: string;
};

export type UpdateCategory = {
  categoryId: string;
  name: string;
};

export type SignUpBody = {
  username: string;
  email: string;
  password: string;
};

export type LogInResponse = SignUpBody;

export type SigninResponse = SignUpBody;

export type LogInBody = Omit<SignUpBody, "email">;

export type ProductsResponse = {
  _id: string;
  categoryId: string;
  productName: string;
  price: string;
};

export type AddProductBodyType = {
  categoryId: string;
  productName: string;
  price: string;
};

export type UpdateProductType = AddProductBodyType & {
  productId: string;
};

export type UserUnautheticated = {
  error: string;
};
