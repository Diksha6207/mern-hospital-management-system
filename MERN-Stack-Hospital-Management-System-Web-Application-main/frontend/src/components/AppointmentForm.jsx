import React, { useState } from "react";
import axios from "axios";
import "./AppointmentForm.css";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctor: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAppointment = async (e) => {
    e.preventDefault();

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
    } = formData;

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
      alert("Please Fill Full Form!");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://your-backend-url.onrender.com/api/v1/appointment",
        formData
      );

      alert("Appointment Booked Successfully ✅");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        appointment_date: "",
        department: "",
        doctor: "",
        address: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="appointment-container">
      <h2>Book Appointment</h2>

      <form onSubmit={handleAppointment} className="appointment-form">
        <div className="form-row">
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        </div>

        <div className="form-row">
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        </div>

        <div className="form-row">
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-row">
          <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} />
          <select name="department" value={formData.department} onChange={handleChange}>
            <option value="">Department</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
        </div>

        <div className="form-row">
          <select name="doctor" value={formData.doctor} onChange={handleChange}>
            <option value="">Select Doctor</option>
            <option value="Priya Mehta">Priya Mehta</option>
          </select>
        </div>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        ></textarea>

        <button type="submit">Get Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;