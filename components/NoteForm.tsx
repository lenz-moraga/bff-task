import { SubmitButton } from "@/app/login/submit-button";
import { NoteType } from "@/app/notes/actions";
import React from "react";

export type NoteForm = {
  handleNote: (formData: FormData) => Promise<void>;
  submitText: string;
  pendingSubmittionText: string;
  noteInfo?: NoteType[] | null;
};

export const NoteForm = ({
  handleNote,
  submitText,
  noteInfo,
  pendingSubmittionText,
}: NoteForm) => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    await handleNote(formData);
  };

  return (
    <form>
      <div className="mb-4">
        <label>Title</label>
        <input
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
          type="text"
          name="note_title"
          defaultValue={noteInfo ? noteInfo[0].note_title : ""}
        />
      </div>
      <div className="mb-4">
        <label>Description</label>
        <textarea
          className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
          name="note_content"
          rows={4}
          defaultValue={noteInfo ? noteInfo[0].note_content : ""}
        />
      </div>
      <div className="flex justify-start gap-6 items-center">
        <SubmitButton
          formAction={handleSubmit}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground text-white font-semibold"
          pendingText={`${pendingSubmittionText} the note...`}
        >
          {submitText} Note
        </SubmitButton>
        <a href="/" className="text-center text-green-600">
          Back
        </a>
      </div>
    </form>
  );
};
