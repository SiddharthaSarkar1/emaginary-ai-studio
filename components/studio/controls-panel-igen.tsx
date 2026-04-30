"use client";

import Link from "next/link";
import { ChevronDownIcon, RefreshCcwIcon, SparklesIcon, UploadIcon } from "lucide-react";

import {
  huggingFaceImageModels,
  huggingFaceImageModelLabels,
  type HuggingFaceImageModel,
} from "@/lib/ai-image-models";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useStudioWorkbench } from "@/context/StudioWorkbenchContext";
import { GenerateButton } from "./workbench-ui";

export function StudioControlsPanelImageGen() {
  const {
    error,
    isLoading,
    quota,
    selectedModel,
    selectModel,
    prompt,
    setPrompt,
  } = useStudioWorkbench();

  return (
    <section className="studio-panel rounded-[2rem] border p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <div className="studio-panel-inset flex size-[4.5rem] shrink-0 items-center justify-center rounded-[1.65rem] border text-primary">
          <SparklesIcon className="size-8" />
        </div>
        <div className="pt-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-[2.4rem]">
            Generate Images
          </h1>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-xl">
            Give a prompt and generate stunning images.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 rounded-[1.35rem] border border-border/45 bg-background/25 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-foreground">
          <span className="tabular-nums text-lg font-semibold text-primary">{quota.remaining}</span>{" "}
          generations left
          <span className="font-normal text-muted-foreground">
            {" "}
            ({quota.used} of {quota.limit} used this month)
          </span>
        </p>
        {quota.remaining <= 0 ? (
          <Button className="text-sm font-medium" asChild>
            <Link href="/#pricing">View plans</Link>
          </Button>
        ) : null}
      </div>

      <div className="studio-panel-inset mt-7 rounded-[1.8rem] border p-5 sm:p-6">
        <p className="text-[1.05rem] font-semibold text-foreground">1. Enter a detailed prompt</p>
        <div className="mt-4 flex flex-col gap-4 rounded-[1.45rem] border border-border/35 bg-background/22 p-1.5">
          <textarea 
            className="h-auto min-h-[8rem] w-full resize-none rounded-xl border-none bg-transparent p-4 text-base placeholder:text-muted-foreground/80 focus:outline-none focus:ring-0"
            placeholder="A cinematic, photorealistic shot of a racoon hacker in a dark server room, dramatic lighting..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="studio-panel-inset mt-7 rounded-[1.8rem] border p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[1.05rem] font-semibold text-foreground">2. Choose an AI Model</p>
          <SparklesIcon className="size-4 text-primary" />
        </div>
        <div className="mt-4 relative">
          <select
            value={selectedModel}
            onChange={(event) => selectModel(event.target.value as HuggingFaceImageModel)}
            className={cn(
              "h-auto w-full appearance-none rounded-[1.2rem] border-border/35 bg-background/25 px-4 py-3 pr-11 font-medium focus:border-primary",
            )}
          >
            {huggingFaceImageModels.map((model) => (
              <option key={model} value={model}>
                {huggingFaceImageModelLabels[model as HuggingFaceImageModel]}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Only text-to-image capable models are shown here.
        </p>
      </div>

      <GenerateButton disabled={!prompt || !selectedModel || isLoading} isLoading={isLoading} />

      {error ? (
        <div className="mt-5 rounded-[1.3rem] border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}
    </section>
  );
}
