import { z } from 'zod';

export type AuthCodeDocument = {
  code: string;
  attempts: number;
};

export type AuthCode = AuthCodeDocument & {
  email: string;
};

export const validateAuthCodeBody = z.object({
  email: z.string().email(),
  code: z.string().regex(/^[0-9]{6}$/i),
});

export type ValidateAuthCodeBody = z.infer<typeof validateAuthCodeBody>;

export const generateAuthCodeBody = z.object({
  email: z.string().email(),
});

export type GenerateAuthCodeBody = z.infer<typeof generateAuthCodeBody>;
