import React, { useEffect, useState } from 'react';
import useGetGallery from "../hooks/useGetGallery.js";
import ErrorText from "./ui/ErrorText.jsx";
import {TbLoader2, TbShare} from "react-icons/tb";
import GalleryCard from "./GalleryCard.jsx";
import { Thumbnails } from "yet-another-react-lightbox/plugins";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import Lightbox from "yet-another-react-lightbox";
import { useNavigate, useSearchParams } from "react-router-dom";

function Gallery() {
  const gallery = useGetGallery();
  const isGallerySuccess = !gallery.isLoading && !gallery.isError && gallery.isSuccess && gallery.data;
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const imageID = searchParams.get('id');

  const imagesForSlide = isGallerySuccess ? gallery.data.map(img => ({
    id: img.id,
    src: img.urls.full,
    share: `${window.location.origin}?id=${img.id}`,
  })) : [];

  useEffect(() => {
    if (imageID && imagesForSlide.length) {
      const idx = imagesForSlide.findIndex(img => img.id === imageID);
      if (idx !== -1) {
        setCurrentIndex(idx);
        setOpen(true);
      }
    }
  }, [imageID, imagesForSlide.length]);

  return (
    <div>
      {!gallery.isLoading ? (!gallery.isError ? (
        <div className='grid grid-cols-4 gap-5'>
          {gallery.data.map((item, index) => (
            <GalleryCard
              smallImgSrc={item.urls.thumb}
              alt={item.alt_description}
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setOpen(true);
                setSearchParams({ id: item.id });
                console.log('working')
              }}
            />
          ))}
          <Lightbox
            open={open}
            close={() => {
              setOpen(false);
              setSearchParams({});
            }}
            slides={imagesForSlide}
            index={currentIndex}
            plugins={[Thumbnails, Download, Share]}
            on={{
              view: ({ index }) => {
                setCurrentIndex(index);
                setSearchParams({ id: imagesForSlide[index].id });
              },
            }}
            toolbar={{
              buttons: [
                <button key="share-button" type="button" className="yarl__button" onClick={() => {
                  if(!navigator.clipboard) {
                    setCopiedText('Sizning brauzeringiz bu narsani qo\'llab quvvatlamaydi iltimos boshqa brauzerdan urinib ko\'ring')
                    return
                  }
                  navigator.clipboard.writeText(imagesForSlide[currentIndex].share)
                    .then(() => {
                      setCopiedText('Nusxalandi!');
                    }).catch((err) => {
                      setCopiedText('Nusxalab bo\'lmadi!')
                    })
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}>
                  <TbShare />
                </button>,
                "close",
              ]
            }}
            render={{
              iconLoading: () => <TbLoader2 className='animate-spin text-white' />,
            }}
          />
          {copied && (
            <div className='absolute left-0 right-0 mx-auto w-fit z-[9999999] bg-white text-black px-5 py-2 rounded-full'>
              <h1>{copiedText}</h1>
            </div>
          )}
        </div>
      ) : (
        <ErrorText>Qandaydir xatolik yuz berdi, iltimos keyinroq urinib ko‘ring.</ErrorText>
      )) : (
        <div className='flex items-center justify-center h-[90vh]'>
          <TbLoader2 className='text-black dark:text-white animate-spin' />
        </div>
      )}
    </div>
  );
}

export default Gallery;
