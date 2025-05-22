"use client"

import React, { useEffect, useState } from 'react';
import { NavigationMenu } from "@/components/shared/navigation/NavigationMenu"
import { Logo } from "@/components/shared/navigation/Logo"
import GreenIntro from './components/sections/GreenIntro';
import GreenHome from './components/sections/GreenHome';
import GreenAbout from './components/sections/GreenAbout';
import GreenSolutions from './components/sections/GreenSolutions';
import GreenProducts from './components/sections/GreenProducts';
import GreenContact from './components/sections/GreenContact';
import GreenFooter from './components/sections/GreenFooter';
import SmoothScrollContainer from "@/components/premium/SmoothScrollContainer"
import { motion } from 'framer-motion';

/**
 * ScrollProgressBar Component
 * Displays a progress bar at the top of the page that fills based on scroll position
 */
const ScrollProgressBar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setScroll(totalHeight > 0 ? scrollPosition / totalHeight : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 z-[100]"
      initial={{ width: 0 }}
      animate={{ width: `${scroll * 100}%` }}
      style={{
        background: 'linear-gradient(90deg, #3DD56D 0%, #2bb757 100%)',
        boxShadow: '0 0 8px 2px #3DD56D55',
        pointerEvents: 'none',
      }}
    />
  );
};

/**
 * GreenPage Component
 * Main page component for the green energy section
 * Includes custom scrollbar styling and section layout
 */
const GreenPage = () => {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Custom scrollbar styles for improved UX */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        html, body {
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <ScrollProgressBar />
      <div className="fixed top-6 left-8 z-50">
        <Logo />
      </div>
      <NavigationMenu />
      
      <div className="relative">
        <GreenIntro />
        <div className="relative mt-[-80px] z-10">
          <GreenHome />
        </div>
      </div>
      
      <div>
        <GreenAbout noSeam={true} />
        <GreenSolutions />
        <GreenProducts />
        <GreenContact />
        <GreenFooter />
      </div>
    </main>
  )
}

export default GreenPage 