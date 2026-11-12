export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

/** The fields a user can edit. Used for both create and update. */
export type NoteInput = Pick<Note, 'title' | 'content'>
