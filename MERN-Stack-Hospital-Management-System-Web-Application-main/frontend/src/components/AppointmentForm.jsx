import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const AppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "12345", // dummy (backend require karta hai)
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctor_firstName: "",
    doctor_lastName: "",
    address: "",
  });

  // ✅ doctors fetch
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "https://mern-hospital-management-system-2.onrender.com/api/v1/user/doctors"
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ doctor select fix
  const handleDoctorChange = (e) => {
    const doc = doctors.find((d) => d._id === e.target.value);

    setFormData({
      ...formData,
      doctor_firstName: doc.firstName,
      doctor_lastName: doc.lastName,
    });
  };

  // ✅ submit
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
      doctor_firstName,
      doctor_lastName,
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
      !doctor_firstName ||
      !doctor_lastName ||
      !address
    ) {
      alert("Please Fill Full Form!");
      return;
    }

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
        nic: "12345",
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
          <input name="firstName" placeholder="First Name" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        </div>

        <div>
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
        </div>

        <div>
          <input type="date" name="dob" onChange={handleChange} />
          <select name="gender" onChange={handleChange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <input type="date" name="appointment_date" onChange={handleChange} />
          <input name="department" placeholder="Department" onChange={handleChange} />
        </div>

        {/* ✅ DOCTOR DROPDOWN */}
        <select onChange={handleDoctorChange}>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.firstName} {doc.lastName}
            </option>
          ))}
        </select>

        <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>

        <button type="submit">Get Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;