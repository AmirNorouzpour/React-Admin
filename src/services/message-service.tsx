import { message } from "antd";

class MessageService {
  success(content: string, duration: number = 1): void {
    message.success(content, duration);
  }

  error(content: string, duration: number = 1): void {
    message.error(content, duration);
  }

  info(content: string, duration: number = 1): void {
    message.info(content, duration);
  }

  warning(content: string, duration: number = 1): void {
    message.warning(content, duration);
  }

  loading(content: string, duration: number = 1): void {
    message.loading(content, duration);
  }
}

const messageService = new MessageService();
export default messageService;
