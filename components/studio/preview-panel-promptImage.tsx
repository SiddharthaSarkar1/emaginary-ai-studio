"use client";

import Image from "next/image";
import { CircleDotIcon, SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useStudioWorkbench } from "@/context/StudioWorkbenchContext";
import { HistoryCard, PreviewFrame } from "./workbench-ui";

export function StudioPreviewPanelPromptToImage() {
  const { history, isLoading, openHistoryPreview, sourcePreview } = useStudioWorkbench();

  return (
    <section className="studio-panel rounded-[2rem] border p-5 sm:p-7">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">Preview</h2>
        <p className="mt-2 text-base text-muted-foreground sm:text-xl">
          Your generated image will appear here.
        </p>
      </div>

      <div className="studio-panel-inset mt-7 rounded-[1.9rem] border p-5 sm:p-6">
        <PreviewFrame label="AI Generated Image">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : sourcePreview ? (
            <Image
              src={sourcePreview}
              alt="AI Generated Image"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-background/25">
              <SparklesIcon className="size-16 text-muted-foreground/50" />
            </div>
          )}
        </PreviewFrame>
      </div>

      <div className="mt-6 flex items-start gap-3 text-lg text-muted-foreground">
        <CircleDotIcon className="mt-1 size-5 shrink-0 text-primary" />
        <p>The result is generated directly from your text prompt with the help of AI.</p>
      </div>

      <div className="studio-panel-inset mt-8 rounded-[1.9rem] border p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-foreground">History</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your saved generations are private to your account.
            </p>
          </div>
          <Button
            variant="outline"
            type="button"
            tabIndex={-1}
            className="studio-pill pointer-events-none rounded-full px-4 py-2 text-sm"
          >
            {history.length} saved
          </Button>
        </div>

        {history.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {history.map((item) => (
              <HistoryCard key={item.id} item={item} onView={() => openHistoryPreview(item)} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[1.4rem] border border-dashed border-border/35 bg-background/15 px-4 py-6 text-center text-sm text-muted-foreground">
            Your generation history will appear here.
          </div>
        )}
      </div>
    </section>
  );
}
