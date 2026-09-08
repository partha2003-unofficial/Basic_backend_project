import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    content: { type: String, required: true },
    blogId: { type: Schema.Types.ObjectId, ref: 'Users_Blog' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'bloging_user' }
})

const commentModel = model('comment_Blog', commentSchema);

export default commentModel;