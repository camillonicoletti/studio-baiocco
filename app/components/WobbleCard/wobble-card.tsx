'use client';

import './wobble-card.css';

interface WobbleCardProps {
  children: React.ReactNode;
  containerClassName?: string;
}

export default function WobbleCard({ children, containerClassName = '' }: WobbleCardProps) {
  return (
    <div className={`wobble-card ${containerClassName}`}>
      <div className="wobble-card__noise" />
      <div className="wobble-card__inner">{children}</div>
    </div>
  );
}
