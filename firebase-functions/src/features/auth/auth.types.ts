export type AuthCodeDocument = {
  code: string;
  attempts: number;
};

export type AuthCode = AuthCodeDocument & {
  email: string;
};
