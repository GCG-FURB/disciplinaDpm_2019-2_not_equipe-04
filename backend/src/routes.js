import Router from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import ProductController from "./app/controllers/ProductController";
import LoginController from "./app/controllers/LoginController";
import TeacherController from "./app/controllers/TeacherController";
import FileController from "./app/controllers/FileController";
import QuestionController from "./app/controllers/QuestionController";
import StudentController from "./app/controllers/StudentController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

// routes.get("/api/products/:id", ProductController.index);
routes.get("/api/products/:id/teacher", ProductController.store);

routes.post("/api/files", upload.single("file"), FileController.store);
// routes.put("/api/products", ProductController.store);
// routes.use(authMiddleware);

routes.post("/api/login", LoginController.store);
routes.post("/api/teachers", TeacherController.store);
routes.put("/api/teachers/:id", TeacherController.update);

routes.get("/api/products/:id", ProductController.show);
routes.post("/api/products", ProductController.store);
routes.put("/api/products/:id", ProductController.update);
routes.delete("/api/products/:id", ProductController.delete);

routes.post("/api/produtcs/:productId/question", QuestionController.store);
routes.get("/api/produtcs/question/:id", QuestionController.show);

routes.post("/api/student", StudentController.store);
// routes.post("/api/student/:name/question/:questionId", StudentController.store);

export default routes;
