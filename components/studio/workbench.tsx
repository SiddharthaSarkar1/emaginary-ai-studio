"use client";

import { StudioWorkbenchProvider, useStudioWorkbench } from "@/context/StudioWorkbenchContext";
import { StudioWorkbenchProps } from "@/lib/types";
import { StudioControlsPanel } from "./controls-panel";
import { StudioPreviewPanel } from "./preview-panel";
import { HistoryPreviewDialog } from "./history-preview-dialog";
import { TypeSelectionTab } from "../TypeSelectionTab";
import { useState } from "react";
import { StudioControlsPanelImageGen } from "./controls-panel-igen";
import PromptToImageWorkbench from "./prompt-workbench";

function StudioWorkbench({ clerkUserId, initialHistory, initialQuota }: StudioWorkbenchProps) {
  const [value, setValue] = useState("imagetoimage")

  return (

    <>

      <section className="flex justify-center items-center m-4 p-2">
        <TypeSelectionTab value={value} setValue={setValue} />
      </section>

      {value === "imagetoimage" && <StudioWorkbenchProvider
        clerkUserId={clerkUserId}
        initialHistory={initialHistory}
        initialQuota={initialQuota}
      >
        <StudioWorkbenchForm />
      </StudioWorkbenchProvider>}

      {value === "texttoimage" && <StudioWorkbenchProvider
        clerkUserId={clerkUserId}
        initialHistory={initialHistory}
        initialQuota={initialQuota}
      >
       <PromptToImageWorkbench />
      </StudioWorkbenchProvider>}
    </>

  );
}

function StudioWorkbenchForm() {
  const { handleSubmit, viewedHistoryItem, closeHistoryPreview } = useStudioWorkbench();

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 items-start lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] xl:gap-8"
    >
      <StudioControlsPanel />
      <StudioPreviewPanel />

      {viewedHistoryItem && (
        <HistoryPreviewDialog item={viewedHistoryItem} onClose={closeHistoryPreview} />
      )}
    </form>
  );
}

export default StudioWorkbench;