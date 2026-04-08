import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Appointment } from "../models/appointmentSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor,
    address,
  } = req.body;

  // ✅ SIMPLE VALIDATION (frontend के हिसाब से)
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor ||
    !address
  ) {
    return res.status(400).json({
      success: false,
      message: "Please Fill Full Form!",
    });
  }

  // ✅ सीधे save (no auth, no doctor check)
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor,
    address,
  });

  res.status(200).json({
    success: true,
    message: "Appointment Booked Successfully",
    appointment,
  });
});

// बाकी functions simple रखे
export const getAllAppointments = catchAsyncErrors(async (req, res) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateAppointmentStatus = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Updated Successfully",
  });
});

export const deleteAppointment = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  await Appointment.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Deleted Successfully",
  });
});