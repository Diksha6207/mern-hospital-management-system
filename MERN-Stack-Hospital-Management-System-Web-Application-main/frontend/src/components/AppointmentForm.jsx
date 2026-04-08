import React, { useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctor_firstName: "",
    doctor_lastName: "",
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

    try {
      const { data } = await axios.post(
        "https://mern-hospital-management-system-2.onrender.com/api/v1/appointment/post",
        formData
      );

      alert(data.message);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        appointment_date: "",
        department: "",
        doctor_firstName: "",
        doctor_lastName: "",
        address: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container form-component">
      <h2>Book Appointment</h2>

      <form onSubmit={handleAppointment}>
        <div>
          <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        </div>

        <div>
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div>
          <input name="nic" placeholder="NIC" value={formData.nic} onChange={handleChange} />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>

        <div>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} />
        </div>

        <div>
          <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
        </div>

        <div>
          <input name="doctor_firstName" placeholder="Doctor First Name" value={formData.doctor_firstName} onChange={handleChange} />
          <input name="doctor_lastName" placeholder="Doctor Last Name" value={formData.doctor_lastName} onChange={handleChange} />
        </div>

        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange}></textarea>

        <button type="submit">Get Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;