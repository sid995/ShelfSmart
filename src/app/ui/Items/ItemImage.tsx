'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Box, CircularProgress } from '@mui/material';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import ImageIcon from '@mui/icons-material/Image';

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
      <Box
        sx={{
          width,
          height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'grey.200',
        }}
      >
        <ImageIcon sx={{ fontSize: 40, color: 'grey.500' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey.200',
      }}
    >
      {isLoading && <CircularProgress />}
      {hasError ? (
        <BrokenImageIcon sx={{ fontSize: 40, color: 'grey.500' }} />
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
          style={{
            objectFit: 'cover',
            display: isLoading ? 'none' : 'block'
          }}
        />
      )}
    </Box>
  );
};

export default ItemImage;