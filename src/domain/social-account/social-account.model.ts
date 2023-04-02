export interface SocialAccount {
  id: number;
  user_id: number;
  provider: string;
  provider_id: string;
  access_token: string;
  created_at: Date;
  updated_at: Date;
}
