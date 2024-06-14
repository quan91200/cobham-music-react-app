import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 1, name: "Indie", value: "indie" },
  { id: 2, name: "Ballad", value: "ballad" },
  { id: 3, name: "Pop", value: "Pop" },
];

export const filterByLanguage = [
  { id: 1, name: "English", value: "english" },
  { id: 2, name: "Vietnamese", value: "vietnamese" },
  { id: 3, name: "Korean", value: "korean" },
  { id: 4, name: "Chinese", value: "chinese" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
