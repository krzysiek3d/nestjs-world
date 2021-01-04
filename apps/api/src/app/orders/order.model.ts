export interface Order {
  id: string;
  name: string;
  description: string;
  status: OrderStatus;
}

export enum OrderStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCEL = 'CANCEL',
}
