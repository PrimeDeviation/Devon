import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ShellWidget from './shell-widget'
import BrowserWidget from './browser-widget'
import EditorWidget from './editor-widget/editor-widget'
import TimelineWidget from './timeline-widget'
import PlannerWidget from './planner-widget'
import Chat from '../../chat/chat'
import { ViewMode } from '@/lib/types'
import { ChatProps } from '@/lib/chat.types'
import { useContext, createContext, useState, useRef } from 'react'

const observeTabs = [
    {
        id: 'planner',
        title: 'Planner',
        content: <PlannerWidget />,
    },
    {
        id: 'timeline',
        title: 'Minimap',
        content: <TimelineWidget />,
    },
]

const gridTabs = [
    {
        id: 'chat',
        content: <></>,
    },
    {
        id: 'shell',
        content: <ShellWidget />,
    },
    {
        id: 'browser',
        content: <BrowserWidget />,
    },
    {
        id: 'editor',
        content: <></>,
    },
    // {
    //     id: 'planner',
    //     title: 'Planner',
    //     content: <Planner />,
    // },
]

const defaultValue = {
    expanded: true,
}

export default function AgentWorkspaceTabs({
    viewMode,
    chatProps,
    visibilityProps: {
        showPlanner,
        setShowPlanner,
        showTimeline,
        setShowTimeline,
    },
}: {
    viewMode: ViewMode
    chatProps: ChatProps
    visibilityProps: {
        showPlanner: boolean
        setShowPlanner: (show: boolean) => void
        showTimeline: boolean
        setShowTimeline: (show: boolean) => void
    }
}) {
    return (
        <>
            {viewMode === ViewMode.Panel ? (
                <div className="flex gap-5 w-full h-full justify-around pr-5 flex-1">
                    <div
                        className={`transition-all duration-300 ${showPlanner ? 'w-full' : 'w-0 overflow-hidden'}`}
                    >
                        <PlannerWidget />
                    </div>
                    <div
                        className={`transition-all duration-300 ${showTimeline ? 'w-full' : 'w-0 overflow-hidden'}`}
                    >
                        <TimelineWidget />
                    </div>
                </div>
            ) : (
                <GridView chatProps={chatProps} />
            )}
        </>
    )
}

// function PlannerWidget() {
//     const { expanded } = useContext(CTX1);
//     return (
//         <div className={`transition-all duration-300 ${expanded ? 'w-1/2' : 'w-0 overflow-hidden'}`}>
//             {expanded && <div>Planner Content</div>}
//         </div>
//     );
// }

// function TimelineWidget() {
//     const { expanded } = useContext(CTX2);
//     return (
//         <div className={`transition-all duration-300 ${expanded ? 'w-1/2' : 'w-0 overflow-hidden'}`}>
//             {expanded && <div>Timeline Content</div>}
//         </div>
//     );
// }

const GridView = ({ chatProps }: { chatProps: ChatProps }) => (
    <div className="h-full w-full flex flex-row gap-4">
        <div className="flex flex-col flex-1">
            <EditorWidget chatId={chatProps.id ?? null} />
        </div>
        <TimelineWidget />
    </div>
)
