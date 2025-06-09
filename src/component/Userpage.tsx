import React, { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const mockUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor" },
];

const Userpage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  
  const handleAddUser = () => setShowForm(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) return;
    setUsers([
      ...users,
      {
        id: users.length + 1,
        name: form.name,
        email: form.email,
        role: form.role,
      },
    ]);
    setForm({ name: "", email: "", role: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-2 sm:px-4">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-700 mb-4 sm:mb-0 sm:mr-auto text-center sm:text-left">
            All Users
          </h1>
          <button
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 bg-blue-50 p-4 rounded-lg flex flex-col gap-3"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border rounded"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border rounded"
                required
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border rounded"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Editor">Editor</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                className="w-full sm:w-auto bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm sm:text-base">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-2 px-2 sm:px-4 border-b text-left">ID</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Name</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Email</th>
                <th className="py-2 px-2 sm:px-4 border-b text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50">
                  <td className="py-2 px-2 sm:px-4 border-b">{user.id}</td>
                  <td className="py-2 px-2 sm:px-4 border-b">{user.name}</td>
                  <td className="py-2 px-2 sm:px-4 border-b">{user.email}</td>
                  <td className="py-2 px-2 sm:px-4 border-b">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Userpage;
