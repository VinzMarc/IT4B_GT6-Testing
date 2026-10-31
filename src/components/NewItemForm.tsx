import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { z } from "zod";
import type { Item } from "../types/index";

const newItemSchema = z.object({
  title: z.string().trim()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title must be 80 characters or fewer"),
  description: z.string(),
  location: z.string().trim().min(1, "Location is required").max(100, "Location must be 100 characters or fewer"),
  type: z.enum(["lost", "found"]),
  reportedBy: z.string().trim().min(1, "Reporter name is required"),
});

export interface NewItemFormProps {
  onAddItem: (item: Omit<Item, "id" | "reportedAt" | "isClaimed">) => void;
}

export function NewItemForm({ onAddItem }: NewItemFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<"lost" | "found">("lost");
  const [reportedBy, setReportedBy] = useState("");
  const [validationError, setValidationError] = useState("");
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedItem = newItemSchema.safeParse({
      title,
      description: description.trim(),
      location,
      type,
      reportedBy,
    });

    if (!parsedItem.success) {
      setValidationError(parsedItem.error.issues[0]?.message ?? "Please check the item details.");
      return;
    }

    setValidationError("");
    onAddItem(parsedItem.data);

    setTitle("");
    setDescription("");
    setLocation("");
    setReportedBy("");
    setType("lost");
    titleInputRef.current?.focus();
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "description") {
      setDescription(value);
    }
    if (name === "location") {
      setLocation(value);
    }
    if (name === "reportedBy") {
      setReportedBy(value);
    }
    if (name === "type") {
      setType(value as "lost" | "found");
    }
  };

  return (
    <form className="report-form" noValidate onSubmit={handleSubmit}>
      <p className="panel-kicker">Add to the board</p>
      <h2>Report an item</h2>
      <p className="form-note">Tell the campus community what went missing or what you found.</p>
      {validationError && <p role="alert">{validationError}</p>}

      <div className="form-field">
        <label>Title</label>
        <input
          ref={titleInputRef}
          name="title"
          value={title}
          onChange={handleInputChange}
          placeholder="Black backpack"
          required
          className=""
        />
      </div>

      <div className="form-field">
        <label>Description</label>
        <textarea
          name="description"
          value={description}
          onChange={handleInputChange}
          placeholder="Found near the library entrance"
          className=""
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="form-field">
          <label>Location</label>
          <input
            name="location"
            value={location}
            onChange={handleInputChange}
            placeholder="Library"
            required
            className=""
          />
        </div>

        <div className="form-field">
          <label>Type</label>
          <select
            name="type"
            value={type}
            onChange={handleInputChange}
            className=""
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label>Reported by</label>
        <input
          name="reportedBy"
          value={reportedBy}
          onChange={handleInputChange}
          placeholder="Jane Doe"
          required
          className=""
        />
      </div>

      <div>
        <button type="submit" className="form-submit">Publish report</button>
      </div>
    </form>
  );
}
