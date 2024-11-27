# User Management System

This project is a comprehensive user management system designed to handle user and role management with dynamic permissions. It includes features for viewing, adding, editing, and deleting users, as well as managing user roles and permissions. 

## **Core Requirements**

### 1. User Management
- **View and Manage Users**:
    - Users can be viewed in a list format.
    - Details for each user can be viewed and edited.
- **Add, Edit, or Delete Users**:
    - Functionality to add new users.
    - Options to edit existing user details.
    - Ability to delete users from the system.
- **Assign Roles and Manage Status**:
    - Roles can be assigned to users.
    - User statuses (Active/Inactive) can be managed.

### 2. Role Management
- **Define and Edit Roles**:
    - Ability to create new roles.
    - Edit existing roles and their details.
- **Permissions and Custom Attributes**:
    - Roles can include various permissions (Read, Write, Delete).
    - Support for custom attributes within roles.

### 3. Dynamic Permissions
- **Assign or Modify Permissions**:
    - Permissions can be assigned to roles dynamically.
    - Modify existing permissions as needed.
- **Display and Manage Permissions**:
    - Permissions are displayed clearly for easy understanding.
    - Modifications to permissions can be done with ease.

### 4. Custom API Simulation (Optional)
- **Mock API Calls**:
    - Simulate API calls for Create, Read, Update, and Delete (CRUD) operations on users and roles.
- **Server Response Simulation**:
    - Mock server responses to validate the system's functionality.

## **Getting Started**

### Prerequisites
- Node.js
- MongoDB
- Any modern web browser

### Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/user-management-system.git
    ```
2. **Install dependencies**:
    ```bash
    cd user-management-system
    npm install
    ```

3. **Start the application**:
    ```bash
    npm start
    ```

## **Usage**

Once the application is running, you can access it at `http://localhost:3000`. You can use the interface to manage users, roles, and permissions as described above.

## **Features**

- **User List**: View all users in the system.
- **Role Assignment**: Assign roles to users.
- **Permission Management**: Manage permissions for different roles.
- **API Simulation**: (Optional) Test CRUD operations with mock API calls.



