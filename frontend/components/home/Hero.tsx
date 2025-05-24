"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatbot } from "@/providers/chatbot-provider";

const Hero = () => {
  const { toggleChatbot } = useChatbot();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const featuresVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const featureItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="relative pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background pointer-events-none" />

      {/* Main hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-24 md:pb-24 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            variants={itemVariants}
          >
            Shop Smarter with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              AI-Powered
            </span>{" "}
            Assistant
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Experience a new way of shopping with personalized recommendations,
            real-time price comparisons, and smart product insights – all guided by
            our intelligent shopping assistant.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                window.location.href = "#features";
              }}
            >
              Explore Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={toggleChatbot}
              className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              Chat with Assistant
            </Button>
          </motion.div>

          {/* Trust features */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
            variants={featuresVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              variants={featureItemVariants}
            >
              <ShoppingBag className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Personalized Shopping</span>
            </motion.div>
            <motion.div
              className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              variants={featureItemVariants}
            >
              <Zap className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium">Instant Price Alerts</span>
            </motion.div>
            <motion.div
              className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-100 dark:border-gray-800"
              variants={featureItemVariants}
            >
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Trusted Reviews</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-100/20 to-cyan-100/20 dark:from-blue-900/10 dark:to-cyan-900/10 blur-3xl" />
      </div>
    </div>
  );
};

export default Hero;