// TODO
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import { Crop, ReactCrop, centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import Modal from '../../atoms/Modal';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import 'react-image-crop/dist/ReactCrop.css';

type ImageCropModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCrop: (croppedImage: Blob) => void;
  image: string;
  aspect?: number;
} & GenericComponentProps;

export default function ImageCropModal({
  className,
  isOpen,
  onClose,
  onCrop,
  image,
  aspect = 1,
}: ImageCropModalProps) {

  const [crop, setCrop] = useState<Crop>();

  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = (e: any) => {
    const { width, height } = e.target;

    const crop = centerCrop(
      convertToPixelCrop(makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        width,
        height
      ),
      width,
      height
    ), width, height);
    setCrop(crop);
  };

  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: Crop): Promise<Blob> => {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Unable to get canvas context');
      }

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas is empty'));
              return;
            }
            resolve(blob);
          },
          'image/webp',
          1
        );
      });
    },
    []
  );

  const confirmButton = (
    <button
      className="bg-apply hover:bg-applyH text-white font-bold py-2 px-4 rounded border-[1px] border-black"
      onClick={async () => {
        if (!imgRef.current || !crop) {
          return;
        }
        const croppedImage = await getCroppedImg(imgRef.current, crop);
        onCrop(croppedImage);
      }}
      key={'confirm'}
    >
      Confirm
    </button>
  );

  return (
    <Modal
      title="Crop Image"
      isOpen={isOpen}
      onClose={onClose}
      buttons={[confirmButton]}
    >
      { image &&
      <ReactCrop
        crop={crop}
        onChange={(c, pC) => {
          setCrop(c)
        }}
        aspect={aspect}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="image crop preview" ref={imgRef} onLoad={onImageLoad}/>
      </ReactCrop>
    }
    </Modal>
  );
}
