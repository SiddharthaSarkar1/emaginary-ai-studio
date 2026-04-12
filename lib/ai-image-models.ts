export const huggingFaceImageModels = [
  "stabilityai/stable-diffusion-2-1",
  "runwayml/stable-diffusion-v1-5",
  "prompthero/openjourney-v4",
];

export type HuggingFaceImageModel = (typeof huggingFaceImageModels)[number];

export const huggingFaceImageModelLabels: Record<HuggingFaceImageModel, string> = {
  "stabilityai/stable-diffusion-2-1": "Stable Diffusion 2.1",
  "runwayml/stable-diffusion-v1-5": "Stable Diffusion 1.5",
  "prompthero/openjourney-v4": "OpenJourney v4",
};
