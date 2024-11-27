import React, { useState } from "react";
import { useUserContext } from "../Context/useUserContext";
import "bootstrap/dist/css/bootstrap.min.css";

function UserManagement() {
  const { users, roles, setUsers } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    status: "Active",
    roles: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [formErrors, setFormErrors] = useState({});

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
  };

  const handleEdit = (user) => {
    setNewUser({
      name: user.name,
      email: user.email,
      status: user.status,
      roles: user.roles,
    });
    setCurrentUserId(user.id);
    setIsEditMode(true);
    setShowModal(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!newUser.name.trim()) {
      errors.name = "Name is required.";
    }
    if (!newUser.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Email is invalid.";
    }
    if (newUser.roles.length === 0) {
      errors.roles = "At least one role must be selected.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveUser = () => {
    if (!validateForm()) return;

    let updatedUsers;
    if (isEditMode) {
      updatedUsers = users.map((user) =>
        user.id === currentUserId ? { ...user, ...newUser } : user
      );
    } else {
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const newUserWithId = { ...newUser, id: newId };
      updatedUsers = [...users, newUserWithId];
    }

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    setNewUser({ name: "", email: "", status: "Active", roles: [] });
    setCurrentUserId(null);
    setIsEditMode(false);
    setShowModal(false);
    setFormErrors({});
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #4a90e2, #004d80)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <h2 className="mb-4 text-center" style={{ color: "#004d80" }}>
          User Management
        </h2>

        {/* Search Bar */}
        <div className="mb-3 d-flex justify-content-center">
          <input
            type="text"
            className="form-control"
            style={{
              maxWidth: "400px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            }}
            placeholder="Search user by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-primary ms-2" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* User Cards */}
        <div className="row">
          {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
            <div className="col-md-4 mb-4" key={user.id}>
              <div
                className="card shadow-sm"
                style={{
                  borderRadius: "8px",
                  background: "#ffffff",
                }}
              >
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ color: "#004d80", fontWeight: "bold" }}
                  >
                    {user.name}
                  </h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        user.status === "Active"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {user.status}
                    </span>
                  </p>
                  <p className="card-text">
                    <strong>Roles:</strong>{" "}
                    {roles
                      .filter((role) => user.roles.includes(role.id))
                      .map((role) => role.name)
                      .join(", ")}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="ms-2 btn btn-warning btn-sm"
                    onClick={() => handleEdit(user)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary shadow"
          onClick={() => {
            setIsEditMode(false);
            setNewUser({ name: "", email: "", status: "Active", roles: [] });
            setShowModal(true);
          }}
        >
          Add User
        </button>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title"
                    style={{ color: "#004d80", fontWeight: "bold" }}
                  >
                    {isEditMode ? "Update User" : "Add User"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                  <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                    />
                    {formErrors.name && (
                      <small className="text-danger">{formErrors.name}</small>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                    />
                    {formErrors.email && (
                      <small className="text-danger">{formErrors.email}</small>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label>Status</label>
                    <select
                      className="form-control"
                      value={newUser.status}
                      onChange={(e) =>
                        setNewUser({ ...newUser, status: e.target.value })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Roles</label>
                    <select
                      className="form-control"
                      multiple
                      value={newUser.roles}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          roles: Array.from(
                            e.target.selectedOptions,
                            (option) => parseInt(option.value)
                          ),
                        })
                      }
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.roles && (
                      <small className="text-danger">{formErrors.roles}</small>
                    )}
                  </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveUser}
                  >
                    {isEditMode ? "Update User" : "Add User"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
