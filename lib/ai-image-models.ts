export const huggingFaceImageModels = [
  "stabilityai/stable-diffusion-2-1",
  "runwayml/stable-diffusion-v1-5",
  "black-forest-labs/FLUX.2-small-decoder"
];

export type HuggingFaceImageModel = (typeof huggingFaceImageModels)[number];

export const huggingFaceImageModelLabels: Record<HuggingFaceImageModel, string> = {
  "stabilityai/stable-diffusion-2-1": "Stable Diffusion 2.1",
  "runwayml/stable-diffusion-v1-5": "Stable Diffusion 1.5",
  "black-forest-labs/FLUX.2-small-decoder": "FLUX.2",
};
