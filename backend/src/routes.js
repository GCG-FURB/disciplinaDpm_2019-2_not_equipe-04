import Router from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import ProductController from "./app/controllers/ProductController";
import LoginController from "./app/controllers/LoginController";
import TeacherController from "./app/controllers/TeacherController";
import FileController from "./app/controllers/FileController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

// routes.get("/api/products/:id", ProductController.index);
routes.get("/api/products/:id/teacher", ProductController.store);
routes.post("/api/products", ProductController.store);
routes.post("/api/files", upload.single("file"), FileController.store);
// routes.put("/api/products", ProductController.store);
// routes.use(authMiddleware);

routes.post("/api/login", LoginController.store);
routes.post("/api/teachers", TeacherController.store);
routes.get("/api/teachers/:id", TeacherController.show);
export default routes;
