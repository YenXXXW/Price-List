import { InferSchemaType, Schema, model } from "mongoose";

const categorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
});

type Category = InferSchemaType<typeof categorySchema>;

export default model<Category>("Category", categorySchema);
