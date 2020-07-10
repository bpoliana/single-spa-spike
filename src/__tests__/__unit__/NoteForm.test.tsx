import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NoteForm, { Props } from "../../components/NoteForm";

function renderNoteForm(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    onTitleChange() {
      return;
    },
    onContentChange() {
      return;
    },
    onImportanceChange() {
      return;
    },
    onSubmit() {
      return;
    },
    isImportant: true,
  };
  return render(<NoteForm {...defaultProps} {...props} />);
}

describe("NoteForm Component", () => {
  test("should allow entering a title", async () => {
    const onTitleChange = jest.fn();
    const { findByTestId, debug } = renderNoteForm({ onTitleChange });
    const title = await findByTestId("title");

    fireEvent.change(title, { target: { value: "test" } });

    expect(onTitleChange).toHaveBeenCalledWith("test");
  });

  test("should allow setting importance to true", async () => {
    const onImportanceChange = jest.fn();
    const { findByTestId } = renderNoteForm({
      onImportanceChange,
      isImportant: false,
    });

    const isImportant = await findByTestId("importance");
    fireEvent.click(isImportant);

    expect(onImportanceChange).toHaveBeenCalledWith(true);

    fireEvent.click(isImportant);

    expect(onImportanceChange).toHaveBeenCalledWith(false);
  });

  test("should submit the form with title, content, and importance", async () => {
    const onSubmit = jest.fn();
    const { findByTestId } = renderNoteForm({
      onSubmit,
      isImportant: false,
    });

    const title = await findByTestId("title");
    const content = await findByTestId("content");
    const importance = await findByTestId("importance");
    const submit = await findByTestId("submit");

    fireEvent.change(title, { target: { value: "test" } });
    fireEvent.change(content, { target: { value: "content" } });
    fireEvent.click(importance);
    fireEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith("test", "content");
  });
});
