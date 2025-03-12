type Sender = 'client' | 'server';
type MessageType = 'system' | 'text' | 'image';

interface IMessage {
  id: string;
  text: string;
  sender: Sender;
  createdAt: string;
  type: MessageType;
}

//type ADayMessages = {[key: string]: IMessage};
//A day messages
interface IADayChat {
  day: string;
  messages: IMessage[];
}

interface IElementPos {
  w: number;
  h: number;
  px: number;
  py: number;
}
