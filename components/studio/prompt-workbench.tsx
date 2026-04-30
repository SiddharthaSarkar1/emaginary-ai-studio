"use client";
import { useStudioWorkbench } from '@/context/StudioWorkbenchContext';
import { StudioControlsPanelImageGen } from './controls-panel-igen';
import { StudioPreviewPanelPromptToImage } from './preview-panel-promptImage';
import { HistoryPreviewDialog } from './history-preview-dialog';

const PromptToImageWorkbench = () => {
    const { handlePromptToImageSubmit, viewedHistoryItem, closeHistoryPreview } = useStudioWorkbench();
  return (
    <>
       <form
             onSubmit={handlePromptToImageSubmit}
             className="grid gap-6 items-start lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] xl:gap-8"
           >
             <StudioControlsPanelImageGen />
             <StudioPreviewPanelPromptToImage />
           </form> 
       {viewedHistoryItem ? (
         <HistoryPreviewDialog item={viewedHistoryItem} onClose={closeHistoryPreview} />
       ) : null}
    </>
  )
}

export default PromptToImageWorkbench;
