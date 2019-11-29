import { Router } from 'express';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

routes.get('/students/enrollments', EnrollmentController.index);
routes.post('/students/:student_id/enrollments', EnrollmentController.store);
routes.put('/students/:student_id/enrollments', EnrollmentController.update);
routes.delete(
  '/students/:student_id/enrollments',
  EnrollmentController.destroy
);

export default routes;
