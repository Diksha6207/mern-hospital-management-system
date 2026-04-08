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
    nic: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctor_firstName: "",
    doctor_lastName: "",
    address: "",
  });

  // FETCH DOCTORS
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "https://mern-hospital-management-system-2.onrender.com/api/v1/user/doctors"
        );
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDoctorChange = (e) => {
    const doc = doctors.find((d) => d._id === e.target.value);
    if (doc) {
      setFormData({
        ...formData,
        doctor_firstName: doc.firstName,
        doctor_lastName: doc.lastName,
        department: doc.doctorDepartment, // auto fill
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } = formData;

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
        nic: "",
        dob: "",
        gender: "",
        appointment_date: "",
        department: "",
        doctor_firstName: "",
        doctor_lastName: "",
        address: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="form-container">
      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />

        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />

        <input name="nic" placeholder="NIC Number" onChange={handleChange} />

        <input type="date" name="dob" onChange={handleChange} />

        <select name="gender" onChange={handleChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input type="date" name="appointment_date" onChange={handleChange} />

        {/* Department Dropdown */}
        <select name="department" onChange={handleChange} value={formData.department}>
          <option value="">Select Department</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Neurology">Neurology</option>
          <option value="Cardiology">Cardiology</option>
        </select>

        {/* Doctor Dropdown */}
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