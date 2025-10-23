import { NewNote, Note } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
  perPage?: number;
}

export async function getNotes(
  query: string,
  page?: number
): Promise<GetNotesResponse> {
  const options = {
    params: {
      page: page || 1,
      perPage: 12,
      ...(query.trim() !== "" && { search: query.trim() }),
    },
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  };
  try {
    const response = await axios.get<GetNotesResponse>("/notes", options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const options = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  try {
    const response = await axios.post<Note>("/notes", newNote, options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(id: string): Promise<Note> {
  const options = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  try {
    const response = await axios.delete<Note>(`/notes/${id}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  const options = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  try {
    const response = await axios.get<Note>(`/notes/${id}`, options);
    return response.data;
  } catch (error) {
    throw error;
  }
}
