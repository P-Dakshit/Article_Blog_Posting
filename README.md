# 🏗️ Blogging App (with Roles & Auth)

## 🔑 Features

### Authentication ✅
- Signup / Login with hashed passwords (bcrypt)  
- JWT tokens for session management  

### Authorization ✅

**Users:**  
- Can create blogs  
- Can update/delete only their own blogs  

**Admins:**  
- Can create, update, delete any blog  
- Can delete users if needed  

### CRUD ✅
- Blogs: Create, Read, Update, Delete  
- Users: Admin-only CRUD (delete only)  

### Database (PostgreSQL) ✅
- **users table** → `id`, `name`, `email`, `password_hash`, `role` (user/admin), `reset_expires`, `reset_otp`  
- **blogs table** → `id`, `title`, `content`, `user_id` (FK to users)  

---

## 🖥️ Frontend Structure  

 
frontend/  
├── public/ # Ignored, not using files here  
├── src/  
│ ├── components/  
│ │ ├── Blog.css ✅ CSS for blogs  
│ │ ├── BlogCreate.jsx ✅ Create blog  
│ │ ├── BlogDetails.jsx ✅ View single blog  
│ │ ├── BlogList.jsx ✅ List blogs  
│ │ ├── BlogUpdate.jsx ✅ Update blog  
│ │ ├── Dashboard.css ✅ Dashboard CSS  
│ │ ├── Dashboard.jsx ✅ Dashboard for user management  
│ │ ├── forgotPassword.jsx ✅ Forgot Password frontend  
│ │ ├── Navbar.css ✅ Navbar CSS  
│ │ ├── Navbar.jsx ✅ Navbar component  
│ │ ├── login.jsx ✅ Login frontend  
│ │ ├── resetPassword.jsx ✅ Reset Password frontend  
│ │ └── signup.jsx ✅ Signup frontend  
│ ├── App.jsx  
│ └── index.js ✅ React entry point  
├── .env # Environment variables  
├── .gitignore # Ignored files for Git  
├── package-lock.json  
└── package.json  


---

## ⚙️ Backend Structure  

backend/
├── connection/  
│ └── db.js ✅ Database connection setup  
├── controller/  
│ ├── blogController.js ✅ Blog CRUD logic  
│ ├── forgotPasswordController.js ✅ Forgot Password logic  
│ ├── loginUserController.js ✅ Login logic  
│ ├── ResetPasswordController.js ✅ Reset Password logic  
│ ├── signupUserController.js ✅ Signup logic  
│ └── userManagement.js ✅ Get all users & delete user  
├── Logs/  
│ ├── app.log ✅ Application logs  
│ └── error.log ✅ Error logs    
├── middleware/  
│ ├── adminOnly.js ✅ Admin-only access  
│ ├── imageUpload.js ✅ Image upload middleware  
│ ├── requestLogger.js ✅ Request logging middleware   
│ └── verifyToken.js ✅ Token verification middleware  
├── routes/   
│ ├── admin.js ✅ Admin-only routes  
│ ├── blog.js ✅ Blog CRUD routes  
│ ├── indexRouter.js ✅ Main router  
│ └── users.js ✅ User-related routes  
├── upload/ ✅ File uploads (currently empty)  
├── utils/  
│ ├── mailer.js ✅ Node mailer utility  
│ └── logger.js ✅ Winston logger    
├── .env # Environment variables  
├── .gitignore # Ignored files for Git  
├── index.js # App entry point  
├── package-lock.json   
└── package.json  
