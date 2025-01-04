import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  client: {
    // Rien côté client pour l'instant
  },
  runtimeEnv: {
    OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    NODE_ENV: import.meta.env.MODE,
  },
}); 