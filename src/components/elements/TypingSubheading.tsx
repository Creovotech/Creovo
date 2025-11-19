'use client';

import { useEffect, useState } from 'react';
import { Subheading } from './subheading';
import { motion } from 'framer-motion';

export const TypingSubheading = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // 1. When the 'text' prop changes, reset immediately
    setDisplayedText(''); 
  }, [text]);

  useEffect(() => {
    // 2. If we haven't finished typing...
    if (displayedText.length < text.length) {
      // Wait a bit, then show the next slice
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 30); // Typing speed

      return () => clearTimeout(timeoutId);
    }
  }, [displayedText, text]);

  return (
    <Subheading className="max-w-3xl mx-auto min-h-[3rem]">
      {displayedText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="inline-block w-1 h-5 ml-1 align-middle bg-purple-500"
      />
    </Subheading>
  );
};