import React, { useState } from "react";
import { useUserContext } from "../Context/useUserContext";

function RoleManagement() {
  const { users, roles, setUsers } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState(null);

  const handleUpdateRole = (user) => {
    setSelectedUser(user);
    setNewRole(user.roles.length > 0 ? user.roles[0] : null); // Assume single role for simplicity
    setShowModal(true);
  };

  const handleSaveRole = () => {
    if (!newRole) return;

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? { ...user, roles: [newRole] } // Update with selected role
          : user
      )
    );
    setShowModal(false);
    setSelectedUser(null);
    setNewRole(null);
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
          Role Management
        </h2>

        {/* Role Management Table */}
        <table
          className="table table-bordered table-hover"
          style={{
            background: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead className="thead-dark">
            <tr>
              <th style={{ background: "#004d80", color: "#ffffff" }}>Name</th>
              <th style={{ background: "#004d80", color: "#ffffff" }}>Email</th>
              <th style={{ background: "#004d80", color: "#ffffff" }}>
                Current Role
              </th>
              <th style={{ background: "#004d80", color: "#ffffff" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ fontWeight: "bold" }}>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {roles
                    .filter((role) => user.roles.includes(role.id))
                    .map((role) => role.name)
                    .join(", ") || "No Role Assigned"}
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleUpdateRole(user)}
                  >
                    Update Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title"
                    style={{ color: "#004d80", fontWeight: "bold" }}
                  >
                    Update Role for {selectedUser.name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Select Role</label>
                    <select
                      className="form-control"
                      value={newRole || ""}
                      onChange={(e) => setNewRole(parseInt(e.target.value))}
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveRole}
                  >
                    Save Role
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

export default RoleManagement;
