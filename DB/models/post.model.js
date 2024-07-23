import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    like: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
      },
     
    ],
    Likes:{
      type:Number,
    },
    option: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
postSchema.virtual("myComment", {
  ref: "comment",
  localField: "_id",
  foreignField: "post",
});
postSchema.pre(/^find/, function () {
  this.populate("myComment");
});
const postModel = mongoose.model("post", postSchema);

export default postModel;
