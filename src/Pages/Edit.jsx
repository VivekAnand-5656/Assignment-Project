import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    const user = stored.find((u) => u.id === parseInt(id));
    if (user) setForm({ name: user.name, email: user.email, phone: user.phone });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = stored.map((u) =>
      u.id === parseInt(id) ? { ...u, ...form } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    toast.success("User Updated Successfully!", {
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
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-lg
                   transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-yellow-600">
          Edit User
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none w-full"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none w-full"
          required
        />

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600
                     shadow-md hover:shadow-lg transition-all duration-300 w-full"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default Edit;
