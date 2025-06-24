# RECIPE SHARING PLATFORM

A full-stack web application for users to share, browse, and manage recipes.

---

## TECHNOLOGIES USED:

Frontend:
- React
- Vite
- Axios
- CSS

Backend:
- Node.js
- Express.js
- MongoDB
- JWT (Authentication)

---

## FEATURES:

- User Registration and Login
- Add, Edit, Delete, View Recipes
- Recipes linked to each user ("My Dishes" feature)
- Search recipes by name
- Pagination for viewing multiple recipes
- Authenticated routes using JWT

---

## FOLDER STRUCTURE:

RecipeSharingApp/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js, .env, package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   └── App.jsx, main.jsx, vite.config.js

---

## TEAM MEMBERS & CONTRIBUTIONS:

1. **MANDADI VARUN (23BCE9738)**  
   - Frontend Setup, Routing  
   - Components: Navbar, RecipeCard, RecipeForm  
   - Integrated complete frontend layout  
   - Project leader and GitHub repo maintainer

2. **K VENKATA SAI RAM NAVEEN (23BCE9725)**  
   - Backend setup (server.js, models)  
   - Recipe logic (controllers, routes)  
   - Added backend .env and packages

3. **RANIPETA ABDUS SAMI (23BCE9735)**  
   - Authentication system (backend)  
   - Frontend: Login, Register pages  
   - API integration (api.js)  
   - .env.example files

4. **MUDE SARAN DHONI NAIK (23BCE9711)**  
   - Frontend Pages: Home, AddRecipe, EditRecipe, MyDishes  
   - Routing and main.jsx setup  
   - Assets and index.html

---

## HOW TO RUN:

1. Run backend:
   - Open terminal → `cd backend`
   - Run: `npm install` then `npm run dev`

2. Run frontend:
   - Open another terminal → `cd frontend`
   - Run: `npm install` then `npm run dev`

---

## ENV FILES TO BE CREATED:

**backend/.env**

PORT=3000
MONGO_DB_USERNAME=your_user
MONGO_DB_PASSWORD=your_pass
MONGO_DB_ENDPOINT=your_mongo_url
DATABASE_NAME=recipeDB
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=3d


**frontend/.env**

VITE_BACKEND_URL=http://localhost:3000


---

## NOTES:

- Use `npm install` in both folders before starting
- MongoDB Atlas was used for database
- Hosted locally on ports 3000 and 5173

