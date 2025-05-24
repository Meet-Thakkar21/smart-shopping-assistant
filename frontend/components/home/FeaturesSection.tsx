"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  LineChart, 
  ShieldCheck, 
  Search, 
  HeartHandshake 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Sparkles className="h-12 w-12 text-blue-500" />,
    title: "Personalized Recommendations",
    description: "Our AI understands your preferences and shopping history to suggest products you'll love.",
    color: "from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/20",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: <Search className="h-12 w-12 text-violet-500" />,
    title: "Smart Search & Discovery",
    description: "Find exactly what you're looking for with our AI-powered search that understands natural language.",
    color: "from-violet-50 to-purple-100 dark:from-violet-950/30 dark:to-purple-900/20",
    textColor: "text-violet-600 dark:text-violet-400"
  },
  {
    icon: <LineChart className="h-12 w-12 text-emerald-500" />,
    title: "Price Tracking & Alerts",
    description: "Get notified when prices drop on items you're watching to ensure you never miss a deal.",
    color: "from-emerald-50 to-green-100 dark:from-emerald-950/30 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400"
  },
  {
    icon: <Zap className="h-12 w-12 text-amber-500" />,
    title: "Real-time Product Comparisons",
    description: "Compare similar products instantly with side-by-side feature and price comparisons.",
    color: "from-amber-50 to-yellow-100 dark:from-amber-950/30 dark:to-yellow-900/20",
    textColor: "text-amber-600 dark:text-amber-400"
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-teal-500" />,
    title: "Authenticity Verification",
    description: "Our AI analyzes reviews and seller data to help you avoid counterfeit products.",
    color: "from-teal-50 to-cyan-100 dark:from-teal-950/30 dark:to-cyan-900/20",
    textColor: "text-teal-600 dark:text-teal-400"
  },
  {
    icon: <HeartHandshake className="h-12 w-12 text-rose-500" />,
    title: "Ethical Shopping Guide",
    description: "Discover products that align with your values with transparency into sustainability and ethical practices.",
    color: "from-rose-50 to-pink-100 dark:from-rose-950/30 dark:to-pink-900/20",
    textColor: "text-rose-600 dark:text-rose-400"
  }
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Powered by Smart AI Technology
          </h2>
          <p className="text-lg text-muted-foreground">
            Our intelligent shopping assistant brings you a suite of powerful features
            that make your shopping experience smarter, faster, and more personalized.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="h-full border-0 bg-gradient-to-br shadow-sm hover:shadow transition-shadow duration-300">
                <CardHeader className={`bg-gradient-to-br ${feature.color} rounded-t-lg p-6`}>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className={`text-xl ${feature.textColor}`}>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-foreground/80 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;