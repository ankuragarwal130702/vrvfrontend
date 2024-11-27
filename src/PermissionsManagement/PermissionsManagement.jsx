import React, { useState } from "react";
import { useUserContext } from "../Context/useUserContext";

function PermissionManagement() {
  const { roles, setRoles, permissions } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newPermission, setNewPermission] = useState("");

  // Open the modal for adding a permission
  const openModal = (roleId) => {
    setSelectedRole(roleId);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setNewPermission("");
  };

  // Add a permission to a role
  const addPermission = () => {
    if (!newPermission) return;

    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === selectedRole
          ? { ...role, permissions: [...new Set([...role.permissions, newPermission])] }
          : role
      )
    );

    closeModal();
  };

  // Delete a permission from a role
  const deletePermission = (roleId, permission) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId
          ? { ...role, permissions: role.permissions.filter((perm) => perm !== permission) }
          : role
      )
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #4a90e2, #004d80)",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <h2 className="text-center" style={{ color: "#2575fc", fontWeight: "bold" }}>
          Permission Management
        </h2>

        {/* Permissions Table */}
        <table className="table table-bordered table-hover mt-4">
          <thead className="thead-dark">
            <tr>
              <th style={{ background: "#2575fc", color: "#fff" }}>Role</th>
              <th style={{ background: "#2575fc", color: "#fff" }}>Permissions</th>
              <th style={{ background: "#2575fc", color: "#fff" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td style={{ fontWeight: "bold" }}>{role.name}</td>
                <td>
                  {role.permissions.length > 0
                    ? role.permissions.join(", ")
                    : "No Permissions"}
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => openModal(role.id)}
                  >
                    Add Permission
                  </button>
                  {role.permissions.map((perm) => (
                    <button
                      key={perm}
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => deletePermission(role.id, perm)}
                    >
                      {perm} &times;
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Permission Modal */}
        {showModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ borderRadius: "12px" }}>
                <div
                  className="modal-header"
                  style={{
                    background: "#2575fc",
                    color: "#fff",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                >
                  <h5 className="modal-title" style={{ fontWeight: "bold" }}>
                    Add Permission
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    style={{ background: "white", border: "none" }}
                  ></button>
                </div>
                <div className="modal-body">
                  <label style={{ fontWeight: "bold" }}>Select Permission</label>
                  <select
                    className="form-control"
                    value={newPermission}
                    onChange={(e) => setNewPermission(e.target.value)}
                  >
                    <option value="">Select Permission</option>
                    {permissions.map((permission) => (
                      <option key={permission} value={permission}>
                        {permission}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addPermission}
                  >
                    Add Permission
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

export default PermissionManagement;
