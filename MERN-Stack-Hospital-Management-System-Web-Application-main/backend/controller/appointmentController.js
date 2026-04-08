import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

// ✅ CREATE APPOINTMENT
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    address,
  } = req.body;

  const patientId = req.user?._id;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  if (!patientId) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const doctor = await User.findOne({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
  });

  if (!doctor) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    address,
    doctorId: doctor._id,
    patientId,
    status: "Pending", // ✅ added
  });

  res.status(200).json({
    success: true,
    message: "Appointment Booked Successfully!",
    appointment,
  });
});

// ✅ GET ALL APPOINTMENTS
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();

  res.status(200).json({
    success: true,
    appointments,
  });
});

// ✅ UPDATE STATUS (🔥 FINAL FIX)
export const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }

  appointment.status = status;

  await appointment.save();

  res.status(200).json({
    success: true,
    message: "Appointment Status Updated!",
  });
});

// ✅ DELETE APPOINTMENT
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }

  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appointment Deleted Successfully!",
  });
});
