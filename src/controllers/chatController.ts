import { Request, Response } from 'express';
import { RedisService } from '../services/redisService';
import { RedisClient } from 'redis';

export class ChatController {
  private redisService: RedisService;

  constructor() {
    console.log('ChatController constructor');
    this.redisService = new RedisService();
    this.sendMessage = this.sendMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.getChatLogs = this.getChatLogs.bind(this);
    this.getLayout = this.getLayout.bind(this);
    this.setLayout = this.setLayout.bind(this);

  }


  public async sendMessage(req: Request, res: Response): Promise<void> {
    const { message, user } = req.body;
    console.log('req.body', req.body);
    this.redisService.set('chat', message, (err) => {
      if (err) {
        console.error('Error sending message:', err);
        res.status(500).send({ error: 'Failed to send message' });
      } else {
        res.status(200).send({ status: 'Message sent' });
      }
    });
  }

  public getMessages(req: Request, res: Response): void {
    this.redisService.get('chat', (err, messages) => {
      console.log('getMessages', messages);
      res.status(200).send({ messages });
    });
  }

  public getChatLogs(req: Request, res: Response): void {
    this.redisService.lrange('chatLogs', 0, -1, (err, messages) => {
      console.log('test', messages);
      res.status(200).send({ messages });
    });
  }

  public getLayout(req: Request, res: Response): void {
    this.redisService.get('layout', (err, messages) => {
      // console.log('getLayout', messages);
      
      const result = JSON.parse(messages as string);
      res.status(200).send(result);
    });
  }
 
  public async setLayout(req: Request, res: Response): Promise<void> {

    console.log('req.body', req.body);
    this.redisService.publish('layout', JSON.stringify(req.body), (err) => {
      if (err) {
        console.error('Error sending message:', err);
        res.status(500).send({ error: 'Failed to send message' });
      } else {
        res.status(200).send({ status: 'Message sent' });
      }
    });
  }

}