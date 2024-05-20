import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const UserSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
    },
    Name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    Password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 60,
      validate: {
        validator: function (value) {
          // Example: Requires at least one uppercase letter, one lowercase letter, one digit, and one special character
          const passwordRegex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{6,}$/;
          return passwordRegex.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid password. Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.`,
      },
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    Phone: {
      type: Number,
      required: [true, "please enter the phone number"],
      match: [/^\d{10}$/, "Please fill a valid 10-digit phone number"],
    },
    Role: {
      type: String,
      enum: ["admin", "user"],

      required: [true, "please choose a role"],
    },
    Logintime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
UserSchema.plugin(AutoIncrement(mongoose), { inc_field: "user_id" });
export const User = mongoose.model("User", UserSchema);
