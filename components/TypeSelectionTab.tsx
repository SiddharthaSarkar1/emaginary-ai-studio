"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { cn } from "@/lib/utils"

const TABS = [
    {
        value: "texttoimage",
        label: "Text To Image",
    },
    {
        value: "imagetoimage",
        label: "Image To Image",
    },
]

interface TypeSelectionTabProps {
    value: string
    setValue: (value: string) => void
}

export function TypeSelectionTab({ value, setValue }: TypeSelectionTabProps) {

    return (
        <Tabs value={value} onValueChange={setValue}>
            <TabsList className="h-auto rounded-full bg-secondary p-1.5">
                {TABS.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                            "rounded-full px-5 py-2 text-base font-medium text-muted-foreground",
                            "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        )}
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
