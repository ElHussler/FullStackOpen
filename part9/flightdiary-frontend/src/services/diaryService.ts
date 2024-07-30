import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types/types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

export const addDiary = (newDiary: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, newDiary)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
};