import axios from "axios";
import API from "../utils/api.js";

const GalleryService = {
  async get() {
    const { data } = await API.get('photos');
    return data
  }
}

export default GalleryService