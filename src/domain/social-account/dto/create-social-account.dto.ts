export class CreateSocialAccountDto {
  readonly user_id: number;
  readonly provider: string;
  readonly provider_id: string;
  readonly access_token: string;
}
