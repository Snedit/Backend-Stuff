import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({

    videoFile:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    duration:{
        type: Number, // this will be fetched from cloudinary
        required: true,
    },
    description:{
        type: String,
        required: true,
    },

    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    views:{
        type: Number,
        default: 0
    },
    isPublished:{
        type: Boolean,
        default: true
    }


}, {
    timestamps: true
})

videoSchema.plugin(mongooseAggregatePaginate);//now we can add advanced queries to our model
export const Video = mongoose.model("Video", videoSchema);
