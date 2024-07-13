import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
	address: {
		type: String,
		required: [true, "Address is required!"],
		trim: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Employee ||
	mongoose.model("Employee", EmployeeSchema);
