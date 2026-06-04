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
  -d '{"email":"test@test.com","password":"secret123","first_name":"John","last_name":"Doe","date_of_birth":"1995-01-01"}' \
  -c cookies.txt
```
**Expected:** `201` with user object (no password field)
**Result:** ✅ Pass

---

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"secret123"}' \
  -c cookies.txt
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

### Current User (me)
```bash
curl http://localhost:8080/api/auth/me \
  -b cookies.txt
```
**Expected:** `200` with logged in user object (no password)
**Result:** ✅ Pass

---

### Get Profile by ID
```bash
curl http://localhost:8080/api/profile/{user_id} \
  -b cookies.txt
```
**Expected:** `200` with user profile
**Result:** ✅ Pass

---

### Get Profile by ID - Private Profile (not following)
```bash
# register second user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@test.com","password":"secret123","first_name":"Jane","last_name":"Doe","date_of_birth":"1995-01-01"}' \
  -c cookies2.txt

# try to view first user's private profile as second user
curl http://localhost:8080/api/profile/{user1_id} \
  -b cookies2.txt
```
**Expected:** `403` with `this profile is private`
**Result:** ✅ Pass

---

### Get Profile by ID - Private Profile (following)
```bash
# manually insert follow into DB
sqlite3 backend/app.db "INSERT INTO followers (follower_id, following_id) VALUES ('{viewer_id}', '{profile_id}');"

# try to view private profile as follower
curl http://localhost:8080/api/profile/{profile_id} \
  -b cookies2.txt
```
**Expected:** `200` with user profile
**Result:** ✅ Pass

---

### Update Profile
```bash
curl -X PUT http://localhost:8080/api/profile \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"nickname":"johnny","about_me":"Hello world"}'
```
**Expected:** `200` with updated user object
**Result:** ✅ Pass

---

### Update Profile - Single Field
```bash
curl -X PUT http://localhost:8080/api/profile \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"nickname":"johnny"}'
```
**Expected:** `200` — only nickname changes, all other fields unchanged
**Result:** ✅ Pass

---

### Toggle Profile Privacy
```bash
# set to private
curl -X PUT http://localhost:8080/api/profile/privacy \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"is_public": false}'

# verify with me endpoint
curl http://localhost:8080/api/auth/me \
  -b cookies.txt
```
**Expected:** `200` with `is_public: false`
**Result:** ✅ Pass

---

### Upload Avatar
```bash
curl -X POST http://localhost:8080/api/profile/avatar \
  -b cookies.txt \
  -F "avatar=@/home/amonoff/Downloads/saka.jpeg"
```
**Expected:** `200` with `{"avatar":"uploads/avatars/{user_id}.jpeg"}`
**Result:** ✅ Pass

---

## Legend
- ✅ Pass
- ❌ Fail
- 🔲 Not tested yet
