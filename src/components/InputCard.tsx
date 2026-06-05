import type { ReactNode } from 'react';

interface InputCardProps {
  title: string;
  context: string;
  children: ReactNode;
}

export function InputCard({ title, context, children }: InputCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-amber-light/30">
      <h3 className="font-serif text-xl font-bold text-charcoal mb-2">{title}</h3>
      <p className="text-sm text-charcoal-light font-sans mb-6 leading-relaxed">{context}</p>
      {children}
    </div>
  );
}
