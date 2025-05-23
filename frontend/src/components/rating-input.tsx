import React from 'react';

interface RatingInputProps {
  initialRating: number;
  onChange: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  showAnimation?: boolean;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  initialRating,
  readOnly = false,
  size = 'md',
  showLabels = false,
  showAnimation = false,
}) => {
  // Component implementation
  return (
    <div>
      <p>Initial Rating: {initialRating}</p>
      <p>Read Only: {readOnly ? 'Yes' : 'No'}</p>
      <p>Size: {size}</p>
      <p>Show Labels: {showLabels ? 'Yes' : 'No'}</p>
      <p>Show Animation: {showAnimation ? 'Yes' : 'No'}</p>
    </div>
  );
};