# Login-Logout

The **Login-Logout** functionality in SwarmOps ensures secure access and seamless session termination for users. This document outlines the key details and actions available within this feature.

---

## Login

## Overview
The **Login** component is a React functional component designed to handle user authentication. 

## What You Will See on the Login Page
1. **Username Field**: A box where you type your username (e.g., your unique ID or name).
2. **Password Field**: A box where you type your password. You can choose to hide or show the password as you type it.
3. **Login Button**: A button to confirm your details and log in.

---

## How to Log In
1. Enter your **Username** in the first box.
2. Enter your **Password** in the second box.
3. Click the **Login Button**. 
   - If your details are correct, you’ll be logged in and see the main page.
   - If there’s an issue (e.g., wrong password), you’ll see an error message telling you what went wrong.

---
## Visual Reference

![login Visual Representation](images/login.png)
---

## Logout

### Overview
The logout system ensures secure termination of user sessions. This is essential for maintaining data privacy and preventing unauthorized access.

### Actions
- **Logout Button**: Safely ends the current user session and redirects to the login page.

### Behavior
- Upon logout, all session data is cleared.
- The user is returned to the **Login Page**, ready for new authentication.

## Visual Reference

![Logout Visual Representation](images/logout.png)

---

**[← Go Back to the User Guide](../user-guide.md)**