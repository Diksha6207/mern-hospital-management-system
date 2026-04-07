import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    address: "",
  });

  // 👉 Doctors fetch
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "/api/v1/user/doctors"
        );
        setDoctors(data.doctors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
  }, []);

  // 👉 Input handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 👉 Submit
  const handleAppointment = async (e) => {
    e.preventDefault();

    if (!doctorId) {
      toast.error("Please select a doctor");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/v1/appointment/post",
        {
          ...formData,
          doctorId,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <section className="appointment-form">
      <h2>Appointment</h2>

      <form onSubmit={handleAppointment}>
        
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="number"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          onChange={handleChange}
        />

        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="date"
          name="appointment_date"
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        {/* 🔥 DOCTOR DROPDOWN */}
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        >
          <option value="">Select Doctor</option>

          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.firstName} {doc.lastName} ({doc.doctorDepartment})
            </option>
          ))}
        </select>

        <button type="submit">Get Appointment</button>
      </form>
    </section>
  );
};

export default AppointmentForm;