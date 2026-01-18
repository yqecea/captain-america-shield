import React from 'react';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, className = "", children }) => {
  return (
    <section id={id} className={`relative w-full min-h-screen flex flex-col justify-center px-6 md:px-20 py-24 ${className}`}>
       {children}
    </section>
  );
};
