"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, CheckCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900" />
          
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3" />
          
          <div className="relative px-6 py-16 sm:px-12 sm:py-20 text-center">
            <Bell className="w-12 h-12 mx-auto mb-6 text-white/90" />
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">
              Stay Updated on New Features & Deals
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Sign up for our newsletter to receive the latest product updates, exclusive deals,
              and smart shopping tips delivered directly to your inbox.
            </p>
            
            <form 
              onSubmit={handleSubmit} 
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0"
            >
              <div className="flex-grow">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full h-12 px-4 rounded-l-md border-0 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || isSubmitted}
                  required
                />
              </div>
              <Button 
                type="submit"
                className={`h-12 rounded-r-md px-6 font-medium ${
                  isSubmitted 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-white text-blue-700 hover:bg-gray-100'
                }`}
                disabled={isLoading || isSubmitted}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Subscribed!</span>
                  </div>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
            
            <p className="text-sm text-white/60 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;