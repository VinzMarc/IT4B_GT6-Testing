import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NewItemForm } from "./NewItemForm";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("NewItemForm", () => {
  it("shows the schema message and sends no request for invalid input", async () => {
    const user = userEvent.setup();
    const onAddItem = vi.fn();
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    render(<NewItemForm onAddItem={onAddItem} />);
    await user.click(screen.getByRole("button", { name: "Publish report" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Title is required");
    expect(onAddItem).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
