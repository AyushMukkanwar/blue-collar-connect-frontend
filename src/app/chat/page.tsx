"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { employers } from "@/lib/data"
import ConversationList from "@/components/conversation-list"
import ChatArea from "@/components/chat-area"
import NewChatDialog from "@/components/new-chat-dialog"
import { Menu } from "lucide-react"

export default function MessagesPage() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedEmployer, setSelectedEmployer] = useState(employers[0])

  const handleSelectConversation = (employer: any) => {
    setSelectedEmployer(employer)
    setShowSidebar(false) // Hide sidebar on mobile after selection
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-0 md:px-4 py-0 md:py-8">
        <div className="bg-white rounded-none md:rounded-lg shadow min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-8rem)] flex flex-col">
          <div className="flex flex-col md:flex-row h-full relative">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-blue-100">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(!showSidebar)}
                className="text-blue-600"
              >
                <Menu />
              </Button>
              <h1 className="text-xl font-bold text-blue-600">Messages</h1>
              <NewChatDialog />
            </div>

            {/* Sidebar */}
            <div
              className={`${showSidebar ? "block" : "hidden"} md:block absolute md:relative z-10 w-full md:w-80 bg-white h-[calc(100%-4rem)] md:h-full border-r border-blue-100 flex flex-col`}
            >
              <div className="p-4 border-b border-blue-100 hidden md:block">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold text-blue-600">Messages</h1>
                  <NewChatDialog />
                </div>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search conversations..."
                    className="pl-8 border-blue-200 focus-visible:ring-blue-500"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-2.5 top-2.5 text-blue-500/50"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>

              <Tabs defaultValue="all" className="flex-1 flex flex-col">
                <div className="px-4 pt-2">
                  <TabsList className="w-full bg-blue-50">
                    <TabsTrigger value="all" className="flex-1">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="employers" className="flex-1">
                      Employers
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="flex-1">
                      Unread
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="flex-1 overflow-y-auto">
                  <ConversationList conversations={employers} onSelectConversation={handleSelectConversation} />
                </TabsContent>

                <TabsContent value="employers" className="flex-1 overflow-y-auto">
                  <ConversationList
                    conversations={employers.filter((e) => e.type === "employer")}
                    onSelectConversation={handleSelectConversation}
                  />
                </TabsContent>

                <TabsContent value="unread" className="flex-1 overflow-y-auto">
                  <ConversationList
                    conversations={employers.filter((e) => e.unreadCount > 0)}
                    onSelectConversation={handleSelectConversation}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Chat Area */}
            <div
              className={`${!showSidebar ? "block" : "hidden"} md:block flex-1 flex flex-col h-[calc(100%-4rem)] md:h-full`}
            >
              <ChatArea employer={selectedEmployer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

