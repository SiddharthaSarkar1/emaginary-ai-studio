import type { GenerationQuotaSnapshot } from "@/lib/generation-quota";
import type { HuggingFaceImageModel } from "@/lib/ai-image-models";

export type GenerationHistorySummaryItem = {
  id: string;
  clerkUserId: string;
  originalFileName: string | null;
  sourceImageUrl: string | null;
  resultImageUrl: string;
  styleSlug: string | null;
  styleLabel: string | null;
  model: string;
  promptUsed: string;
  createdAt: Date | string;
};

export type GenerationResult = {
  imageBase64: string;
  mimeType: string;
  model: HuggingFaceImageModel;
  savedGeneration: GenerationHistorySummaryItem;
  style: {
    slug: string;
    label: string;
  };
  promptUsed: string;
};

export type StudioWorkbenchProps = {
  clerkUserId: string;
  initialHistory: GenerationHistorySummaryItem[];
  initialQuota: GenerationQuotaSnapshot;
};

export type UploadedSource = {
  imageUrl: string;
  originalFileName: string;
  sourceMimeType: string;
};