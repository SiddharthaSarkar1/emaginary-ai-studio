import { InferenceClient } from "@huggingface/inference";

const apiKey = process.env.HUGGING_FACE_API_KEY;

export const hf = apiKey ? new InferenceClient(apiKey) : null;