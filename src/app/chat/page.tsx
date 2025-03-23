"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User2, Briefcase, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Types for our chat messages
type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// Quick reply suggestions
const quickReplies = [
  { id: 1, text: "Find jobs near me" },
  { id: 2, text: "Resume tips" },
  { id: 3, text: "Interview preparation" },
  { id: 4, text: "Salary information" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content:
        "Hello! I'm your job search assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle sending a message
  const handleSendMessage = async (text = input) => {
    if (!text.trim()) return;

    // Create a new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // This is where you would integrate your own AI solution
      // For now, we'll just simulate a response after a delay
      await simulateAIResponse(userMessage.content);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate AI response (replace this with your actual AI integration)
  const simulateAIResponse = async (userMessage: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate a simple response based on keywords in the user message
    let response = "";

    if (userMessage.toLowerCase().includes("job")) {
      response =
        "I can help you find job opportunities that match your skills and preferences. What type of blue collar job are you looking for?";
    } else if (
      userMessage.toLowerCase().includes("resume") ||
      userMessage.toLowerCase().includes("cv")
    ) {
      response =
        "Having a well-crafted resume is important. Would you like some tips on how to improve your resume for blue collar job applications?";
    } else if (userMessage.toLowerCase().includes("interview")) {
      response =
        "Preparing for interviews is crucial. I can provide some common interview questions for blue collar positions if you'd like.";
    } else if (
      userMessage.toLowerCase().includes("salary") ||
      userMessage.toLowerCase().includes("pay")
    ) {
      response =
        "Salary ranges vary by position, location, and experience. Is there a specific job role you'd like salary information about?";
    } else if (
      userMessage.toLowerCase().includes("near me") ||
      userMessage.toLowerCase().includes("location")
    ) {
      response =
        "I can help you find jobs in your area. Could you please specify your city or zip code so I can show you relevant opportunities?";
    } else {
      response =
        "I'm here to help with your job search. You can ask me about job listings, application tips, interview preparation, or anything else related to finding a blue collar job.";
    }

    // Add AI response to chat
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      },
    ]);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border rounded-xl shadow-lg overflow-hidden bg-gradient-to-b from-background to-muted/30">
          <div className="flex flex-col h-[650px]">
            {/* Chat header */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="AI Assistant"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        <Bot size={18} />
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                  </div>
                  <div>
                    <p className="font-semibold">Job Assistant</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Available 24/7
                      </span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  <Briefcase className="h-3 w-3 mr-1" />
                  Job Expert
                </Badge>
              </div>
            </div>

            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4 bg-gradient-to-br from-slate-50/50 to-blue-50/50 dark:from-slate-950/50 dark:to-blue-950/50">
              <div className="space-y-6 py-2">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[85%] ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar
                        className={`h-9 w-9 mt-0.5 border-2 ${
                          message.role === "assistant"
                            ? "border-blue-200 dark:border-blue-800"
                            : "border-indigo-200 dark:border-indigo-800"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <>
                            <AvatarImage
                              src="/placeholder.svg?height=36&width=36"
                              alt="AI Assistant"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                              <Bot size={16} />
                            </AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage
                              src="/placeholder.svg?height=36&width=36"
                              alt="User"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                              <User2 size={16} />
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                            message.role === "assistant"
                              ? "bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-900"
                              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5 ml-2">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start gap-3 max-w-[85%]">
                      <Avatar className="h-9 w-9 mt-0.5 border-2 border-blue-200 dark:border-blue-800">
                        <AvatarImage
                          src="/placeholder.svg?height=36&width=36"
                          alt="AI Assistant"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                          <Bot size={16} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="rounded-2xl px-4 py-2.5 bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-900 shadow-sm">
                          <div className="flex space-x-2">
                            <div
                              className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Chat input */}
            <div className="p-4 border-t bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 bg-white/80 dark:bg-slate-800/80 border-blue-100 dark:border-blue-900 rounded-full pl-4 pr-4 py-6 focus-visible:ring-blue-500"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="rounded-full h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="gap-2 rounded-full px-6">
            <ArrowRight className="h-4 w-4" />
            <span>Browse Job Listings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
