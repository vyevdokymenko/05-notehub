// https://notehub-public.goit.study/api/docs

import axios, { type InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { type NewNote, type Note, type NoteTag } from "../types/note.ts";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token: string = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const message = axios.isAxiosError<{ message?: string }>(error)
      ? (error.response?.data?.message ?? error.message)
      : "Something went wrong. Please try again.";

    toast.error(message || "Request failed. Please try again.");
    return Promise.reject(error);
  },
);

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
  const search = request.searchText?.trim().length === 0 ? null : request.searchText?.trim();
  const { data } = await api.get<SearchNotesResponse>("/notes", {
    params: {
      search: search,
      tag: request.tag,
      page: request.page ?? 1,
      perPage: request.perPage ?? 12,
      sortBy: request.sortBy,
    },
  });
  return data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
};
