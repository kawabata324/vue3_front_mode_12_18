export type User = {
  allow_password_change: boolean;
  created_at: Date;
  email: string;
  id: number;
  image?: string;
  name?: string;
  nickname?: string;
  provider: string;
  uid: string;
  updated_at: Date;
}
