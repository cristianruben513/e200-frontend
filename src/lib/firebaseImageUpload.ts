import firebaseApp from "@/lib/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export interface UploadImageType {
  url: string
}

export async function firebaseImageUpload(image: File, path: string): Promise<UploadImageType> {
  try {
    const fileName = new Date().getTime() + "-" + image.name;
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `${path}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise<UploadImageType>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log("error uploading image ", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              const uploadedImage: UploadImageType = { url: downloadUrl };
              console.log("file available in ", downloadUrl);
              resolve(uploadedImage);
            })
            .catch((error) => {
              console.log("error getting download url ", error);
              reject(error);
            });
        }
      );
    });
  } catch (err) {
    throw new Error(`Algo salió mal ${err}`);
  }
};