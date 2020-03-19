import { Chore } from './chore.interface';

export interface Child {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  url: string;
  photo_url: string;
  chores: Array<Chore>;
}
