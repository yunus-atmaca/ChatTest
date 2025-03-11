type Sender = 'client' | 'server';
type MessageType = 'system' | 'text' | 'image';

interface IMessage {
  id: string;
  text: string;
  deleted: boolean;
  sender: Sender;
  createdAt: string;
  type: MessageType;
}
