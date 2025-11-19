import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      id: stored.length ? stored[stored.length - 1].id + 1 : 1,
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    const updated = [...stored, newUser];
    localStorage.setItem("users", JSON.stringify(updated));

    toast.success("User Added!", {
      position: "top-center",
      autoClose: 1500,
      theme: "light",
      transition: Bounce,
    });

    navigate("/");  
  };

  return (
    <div className="w-full min-h-screen p-4 bg-[#F3F4F6] flex justify-center items-start sm:items-center pt-10 sm:pt-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg 
                   transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl
                   sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">
          Add New User
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mb-4 w-full transition-all duration-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mb-4 w-full transition-all duration-300"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mb-6 w-full transition-all duration-300"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                     shadow-md hover:shadow-lg transition-all duration-300 w-full"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default Create;
