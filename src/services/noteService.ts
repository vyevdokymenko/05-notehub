// https://notehub-public.goit.study/api/docs

import axios, {type InternalAxiosRequestConfig} from "axios";
import {type Note, type NoteTag} from "../types/note.ts";

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token: string = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

interface SearchNotesRequest {
  searchText?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

interface SearchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (request: SearchNotesRequest): Promise<SearchNotesResponse> => {
  const search = request.searchText?.trim().length === 0
    ? null
    : request.searchText;
  const {data} = await api.get<SearchNotesResponse>("/notes", {
    params: {
      search: search,
      tag: request.tag,
      page: request.page ? request.page : 1,
      perPage: request.perPage ? request.perPage : 12,
      sortBy: request.sortBy,
    },
  });
  return data;
};

export const createNote = async (note: Note): Promise<Note> => {
  const {data} = await api.post<Note>("/notes", note);
  return data;
}

export const deleteNote = async (noteId: Note["id"]): Promise<void> => {
  await api.delete<Note>(`/notes/${noteId}`);
}