"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    content: "The AI assistant understands my style perfectly! It recommended a dress that became my favorite piece this season. I've saved so much time not having to browse through hundreds of options.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Reviewer",
    content: "As someone who reviews tech products for a living, I'm impressed by how accurately the AI compares specifications and finds the best deals. It even alerted me to a price drop on a laptop I'd been eyeing for months.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Busy Parent",
    content: "With three kids, I never have time to shop carefully. This assistant has been a game-changer for finding quality children's products within my budget. The ethical shopping guide is an unexpected bonus!",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Home Improvement DIYer",
    content: "The product comparisons helped me find tools that were perfect for my projects. The assistant actually understood what I needed even when I wasn't using the right terminology. Saved me from buying the wrong equipment!",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
  },
  {
    id: 5,
    name: "Olivia Patel",
    role: "Sustainable Shopper",
    content: "I care deeply about where my products come from. The ethical shopping guide has made it so much easier to find brands that align with my values. I feel good about every purchase I make now.",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Get visible testimonials (3 at a time on larger screens)
  const getVisibleTestimonials = () => {
    const visibleCount = 3;
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    
    return result;
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    // Reset autoplay when user interacts
    if (isAutoplay) {
      setIsAutoplay(false);
      setTimeout(() => setIsAutoplay(true), 10000);
    }
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
    
    // Reset autoplay when user interacts
    if (isAutoplay) {
      setIsAutoplay(false);
      setTimeout(() => setIsAutoplay(true), 10000);
    }
  };

  // Autoplay logic
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay, currentIndex]);

  // Animation variants
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover how ShopSmart AI has transformed the shopping experience for our users.
          </p>
        </div>

        {/* Desktop testimonials (3 visible at once) */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <TestimonialCard key={`${testimonial.id}-${idx}`} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors duration-300",
                  idx === currentIndex 
                    ? "bg-blue-500" 
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile testimonials (1 visible at once) */}
        <div className="lg:hidden relative overflow-hidden">
          <div className="relative h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full"
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors duration-300",
                    idx === currentIndex 
                      ? "bg-blue-500" 
                      : "bg-gray-300 dark:bg-gray-700"
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4 border-2 border-blue-100 dark:border-blue-900">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{testimonial.name}</h3>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
        
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < testimonial.rating 
                  ? "text-amber-400 fill-amber-400" 
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          ))}
        </div>
        
        <p className="text-foreground/90 flex-grow italic">"{testimonial.content}"</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialsSection;