const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    expenses: [
        {
            text: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    monthlyBudget: {
    type: Number,
    default: 0, // 0 means not set
    min: 0
  },
    budgetCurrency: {
    type: String,
    default: "INR"
  }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;