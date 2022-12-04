import { z } from 'zod';

export const notifySharedListBody = z.object({
  email: z.string().email(),
  listId: z.string(),
});

export type NotifySharedListBody = z.infer<typeof notifySharedListBody>;
