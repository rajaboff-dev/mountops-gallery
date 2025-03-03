import React, {useEffect, useState} from 'react';
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {TbLoader2, TbX} from "react-icons/tb";
import Lightbox, {useLightboxState} from "yet-another-react-lightbox";
import {Thumbnails} from "yet-another-react-lightbox/plugins";
import Download from 'yet-another-react-lightbox/plugins/download'
import Share from "yet-another-react-lightbox/plugins/share"
import {useNavigate, useSearchParams} from "react-router-dom";


function GalleryCard({smallImgSrc, alt, onClick}) {
  return (
    <>
      <div className='w-full h-72' onClick={onClick}>
        <img
          src={smallImgSrc}
          alt={alt}
          className='object-cover h-full w-full rounded-md duration-150 brightness-90 hover:brightness-100'
        />
      </div>

    </>
  );
}

export default GalleryCard;