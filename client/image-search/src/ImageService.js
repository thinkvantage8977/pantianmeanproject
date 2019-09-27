import axios from "axios";

const imageLinkUrl = "api/image/";

class ImageService {
  static getImagesUrls(keyword) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(imageLinkUrl+keyword);
        const data = res.data.photos.photo;
        resolve(
          data
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default ImageService;
