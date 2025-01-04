import { z } from "zod";

const envSchema = z.object({
  VITE_OPENAI_API_KEY: z.string().min(1),
});

// Vérifier que les variables d'environnement sont définies
const parsed = envSchema.safeParse({
  VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
});

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = {
  OPENAI_API_KEY: parsed.data.VITE_OPENAI_API_KEY,
}; 