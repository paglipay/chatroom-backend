import { Router } from 'express';
import { ChatController } from '../controllers/chatController';

const router = Router();
const chatController = new ChatController();

router.get('/layout', chatController.getLayout);
router.post('/layout', chatController.setLayout);
router.post('/message', chatController.sendMessage);
router.get('/messages', chatController.getMessages);
router.get('/chatLogs', chatController.getChatLogs);

export const setChatRoutes = (app:any) => {
  app.use('/chat', router);
};