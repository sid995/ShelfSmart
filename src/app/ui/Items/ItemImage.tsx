'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Loader2, Image as ImageIcon, ImageOff } from 'lucide-react';

interface ItemImageProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
}

const ItemImage: React.FC<ItemImageProps> = ({ src, alt, width, height }) => {
  const [isLoading, setIsLoading] = useState(!!src);
  const [hasError, setHasError] = useState(false);

  if (!src) {
    return (
      <div
        className="flex justify-center items-center bg-gray-200"
        style={{ width, height }}
      >
        <ImageIcon className="w-10 h-10 text-gray-500" />
      </div>
    );
  }

  return (
    <div
      className="relative flex justify-center items-center bg-gray-200"
      style={{ width, height }}
    >
      {isLoading && (
        <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />
      )}
      {hasError ? (
        <ImageOff className="w-10 h-10 text-gray-500" />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`object-cover ${isLoading ? 'hidden' : 'block'}`}
        />
      )}
    </div>
  );
};

export default ItemImage;