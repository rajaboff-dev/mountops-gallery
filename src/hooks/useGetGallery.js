import GalleryService from "../services/GalleryService.js";
import {useQuery} from "@tanstack/react-query";
import gallery from "../components/Gallery.jsx";

const useGetGallery = ({ props } = {}) => {
  return useQuery({
    queryKey: ['gallery', props],
    queryFn: GalleryService.get,
  })
}

export default useGetGallery;