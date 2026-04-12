import { HfInference } from "@huggingface/inference";

const apiKey = process.env.HUGGING_FACE_API_KEY;

export const hf = apiKey ? new HfInference(apiKey) : null;
