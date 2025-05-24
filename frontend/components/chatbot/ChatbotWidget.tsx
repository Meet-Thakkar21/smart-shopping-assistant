"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, MinusCircle, Send, Bot, Mic, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useChatbot } from "@/providers/chatbot-provider";
import { cn } from "@/lib/utils";

const ChatbotWidget = () => {
  const { messages, isOpen, isTyping, sendMessage, toggleChatbot, clearMessages } = useChatbot();
  const [input, setInput] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Show tooltip after 3 seconds if chat is not open
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        
        // Hide tooltip after 5 seconds
        const hideTimer = setTimeout(() => {
          setShowTooltip(false);
        }, 5000);
        
        return () => clearTimeout(hideTimer);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    setShowTooltip(false);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const widgetVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const chatVariants = {
    hidden: { opacity: 0, y: 20, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  };
  
  const bubbleVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip open={showTooltip}>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleChatbot}
                size="icon"
                className={cn(
                  "h-14 w-14 rounded-full shadow-lg",
                  isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
                )}
                aria-label={isOpen ? "Close chat" : "Open chat"}
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <MessageSquare className="h-6 w-6 text-white" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" align="center">
              <p>Need help? Chat with our AI assistant!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-full sm:w-96 max-h-[600px] rounded-lg overflow-hidden shadow-xl"
            variants={widgetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-[500px] bg-card border border-border">
              {/* Chat header */}
              <div className="flex items-center justify-between p-4 bg-blue-600">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 border border-white/20">
                    <AvatarImage src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-white">ShopSmart Assistant</h3>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                      <span className="text-xs text-white/80">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-blue-700 h-8 w-8"
                    onClick={clearMessages}
                    aria-label="Clear chat"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-blue-700 h-8 w-8"
                    onClick={toggleChatbot}
                    aria-label="Close chat"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      variants={bubbleVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className={cn(
                        "mb-4 flex",
                        message.isBot ? "justify-start" : "justify-end"
                      )}
                    >
                      {message.isBot && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                          <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "max-w-[75%] rounded-lg px-4 py-3",
                          message.isBot
                            ? "bg-white dark:bg-gray-800 text-foreground"
                            : "bg-blue-600 text-white ml-2"
                        )}
                      >
                        {message.content}
                      </div>
                      {!message.isBot && (
                        <Avatar className="h-8 w-8 ml-2 mt-1">
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      variants={bubbleVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex justify-start mb-4"
                    >
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                      <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 max-w-[75%]">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <form onSubmit={handleSubmit} className="p-4 bg-background border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                    aria-label="Voice input"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Input
                    type="text"
                    placeholder="Type your message here..."
                    className="flex-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    ref={inputRef}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    disabled={!input.trim()}
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                  <span className="text-xs text-muted-foreground">AI-generated responses may not always be accurate</span>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;