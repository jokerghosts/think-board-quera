import { apiClient, type ApiResponse } from '../../lib/api-client'
import type { Note, NoteInput } from './types'

export const notesApi = {
  async getAll(): Promise<Note[]> {
    const { data } = await apiClient.get<ApiResponse<Note[]>>('/notes')
    return data.response
  },

  async getById(id: string): Promise<Note> {
    const { data } = await apiClient.get<ApiResponse<Note>>(`/notes/${id}`)
    return data.response
  },

  async create(input: NoteInput): Promise<Note> {
    const { data } = await apiClient.post<ApiResponse<Note>>('/notes', input)
    return data.response
  },

  async update(id: string, input: NoteInput): Promise<Note> {
    const { data } = await apiClient.put<ApiResponse<Note>>(`/notes/${id}`, input)
    return data.response
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/notes/${id}`)
  },
}
