import { z } from 'zod';

export const LoginSchema = z.object({
  login: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('invalid email'),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
});

export type LoginDto = z.infer<typeof LoginSchema>;
