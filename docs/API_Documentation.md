# REST API Specifications - CPMS

## 1. Authentication Endpoints

### `POST /api/auth/register`
Creates a new user account.
- **Request Body**:
  ```json
  {
    "email": "student@cpms.edu",
    "password": "Password123!",
    "role": "Student",
    "full_name": "Rahul Kumar",
    "branch": "CSE",
    "cgpa": 8.5
  }
  ```
- **Response**: `201 Created`

### `POST /api/auth/login`
Authenticates user and returns JWT token.
- **Request Body**:
  ```json
  {
    "email": "student@cpms.edu",
    "password": "Password123!"
  }
  ```
- **Response**:
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "user_id": 1,
      "email": "student@cpms.edu",
      "role": "Student"
    }
  }
  ```

---

## 2. Drives & Eligibility Endpoints

### `GET /api/drives`
Lists all recruitment drives. If authenticated as a Student, returns computed eligibility fields:
- `is_eligible`: boolean
- `eligibility_reasons`: array of constraint violation messages.

### `POST /api/drives`
Posts a new recruitment drive (Company / Officer / Admin).

---

## 3. Applications & Interviews Endpoints

### `POST /api/applications/apply`
Applies student to drive after executing automated eligibility verification.

### `PUT /api/applications/<id>/status`
Updates candidate status to `SHORTLISTED`, `REJECTED`, or `SELECTED`.
