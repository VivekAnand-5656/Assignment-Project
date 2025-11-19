import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const stored = JSON.parse(localStorage.getItem("users"));
      if (stored && stored.length > 0) {
        setUsers(stored);
      } else {
        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/users");
          const data = await res.json();
          setUsers(data);
          localStorage.setItem("users", JSON.stringify(data));
        } catch (err) {
          console.log("Error fetching API users", err);
        }
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = (id) => { 
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated)); 
  };

  return (
    <div className="w-full md:w-[85vw] min-h-screen p-6 bg-[#F4F9FD] flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">User Management</h1>

      <Link
        to="/create-user"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition-colors"
      >
        + Add User
      </Link>

      <div className="w-full max-w-5xl overflow-x-auto">
        {users.length > 0 ? (
          users.map((u, index) => (
            <div
              key={u.id}
              className="flex flex-col md:flex-row justify-between items-center bg-white rounded-lg shadow-md mb-4 p-3 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span className="w-full md:w-1/12 text-center font-medium">{index + 1}</span>
              <span className="w-full md:w-2/12 text-center md:text-left">{u.name}</span>
              <span className="w-full md:w-3/12 text-center md:text-left">{u.email}</span>
              <span className="w-full md:w-2/12 text-center md:text-left">{u.phone}</span>
              <div className="flex flex-wrap justify-center md:justify-around gap-2 w-full md:w-4/12 mt-2 md:mt-0">
                <Link
                  to={`/edit/${u.id}`}
                  className="bg-[#cfcb08] text-white px-3 py-1 rounded hover:bg-[#b9b606] transition-colors"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => {
                    toast.success("User Deleted Successfully!", {
                      position: "top-center",
                      autoClose: 1500,
                      theme: "light",
                      transition: Bounce,
                    }); 
                    deleteUser(u.id);
                  }}
                  className="bg-[#f90303] text-white px-3 py-1 rounded hover:bg-[#ad0505] transition-colors"
                >
                  Delete
                </button>
                <Link
                  to={`/user/${u.id}`}
                  className="bg-[#018701] text-white px-3 py-1 rounded hover:bg-[#6bff0f] transition-colors"
                >
                  👁️
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center p-4 text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
