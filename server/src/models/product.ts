import { InferSchemaType, Schema, model } from "mongoose";

const productSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

type Product = InferSchemaType<typeof productSchema>;

export default model<Product>("Product", productSchema);
