import Hero from '@/components/home/Hero';
import ProductShowcase from '@/components/home/ProductShowcase';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import Newsletter from '@/components/home/Newsletter';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

export default function Home() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <FeaturesSection />
      <TestimonialsSection />
      <Newsletter />
      <ChatbotWidget />
    </>
  );
}