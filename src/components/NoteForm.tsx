import React from "react";
import { Button } from "@material-ui/core";

interface Author {
  firstName: string;
  lastName: string;
}

export interface Props {
  isImportant: boolean;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onImportanceChange: (isImportant: boolean) => void;
  onSubmit: (title: string, content: string) => void;
}

const NoteForm = (props: Props) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isImportant, setImportance] = React.useState(props.isImportant);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
    props.onTitleChange(value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
    props.onContentChange(value);
  };

  const handleImportanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setImportance(checked);
    props.onImportanceChange(checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(title, content);
  };

  return (
    <form data-testid="note-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        data-testid="title"
        type="text"
        name="title"
        value={title}
        onChange={handleTitleChange}
      />

      <label htmlFor="content">Content:</label>
      <input
        data-testid="content"
        type="text"
        name="content"
        value={content}
        onChange={handleContentChange}
      />

      <label>
        <input
          data-testid="importance"
          type="checkbox"
          name="isImportant"
          checked={isImportant}
          onChange={handleImportanceChange}
        />
      </label>

      <Button data-testid="submit" type={"submit"} datatype={"submit"}>
        {" "}
        Submit
      </Button>
    </form>
  );
};

export default NoteForm;
