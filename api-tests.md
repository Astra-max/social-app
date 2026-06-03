# Social Network API Test Log

## Setup
```bash
# Start the server
cd backend
go run ./cmd/api
```

---

## Auth Endpoints

### Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"secret123","first_name":"John","last_name":"Doe","date_of_birth":"1995-01-01"}'
```
**Expected:** `201` with user object (no password field)
**Result:** ✅ Pass

---

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"secret123"}'
```
**Expected:** `200` with user object
**Result:** ✅ Pass

---

### Login - Wrong Password
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"wrongpassword"}'
```
**Expected:** `401` with `invalid email or password`
**Result:** ✅ Pass

---

### Login - Duplicate Email
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"secret123","first_name":"John","last_name":"Doe","date_of_birth":"1995-01-01"}'
```
**Expected:** `409` with `email already registered`
**Result:** ✅ Pass

---

### Logout
```bash
# Step 1 — login and save cookie
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"secret123"}' \
  -c cookies.txt

# Step 2 — logout using saved cookie
curl -X POST http://localhost:8080/api/auth/logout \
  -b cookies.txt
```
**Expected:** `200` with `{"message":"logged out"}`
**Result:** ✅ Pass

---

## Profile Endpoints

### Get Own Profile
```bash
curl http://localhost:8080/api/profile \
  -b cookies.txt
```
**Expected:** `200` with full user profile
**Result:** 🔲 Not tested

---

### Get Another User's Profile
```bash
curl http://localhost:8080/api/profile/{user_id} \
  -b cookies.txt
```
**Expected:** `200` if public or follower, `403` if private and not following
**Result:** 🔲 Not tested

---

### Update Profile
```bash
curl -X PUT http://localhost:8080/api/profile \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"nickname":"johnny","about_me":"Hello world"}'
```
**Expected:** `200` with updated user object
**Result:** 🔲 Not tested

---

### Toggle Profile Privacy
```bash
curl -X PUT http://localhost:8080/api/profile/privacy \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"is_public": false}'
```
**Expected:** `200` with updated privacy setting
**Result:** 🔲 Not tested

---

### Upload Avatar
```bash
curl -X POST http://localhost:8080/api/profile/avatar \
  -b cookies.txt \
  -F "avatar=@/path/to/image.jpg"
```
**Expected:** `200` with avatar path
**Result:** 🔲 Not tested

---

### Current User
```bash
curl http://localhost:8080/api/auth/me \
  -b cookies.txt
```
**Expected:** `200` with logged in user object
**Result:** 🔲 Not tested

---

## Legend
- ✅ Pass
- ❌ Fail
- 🔲 Not tested yet
