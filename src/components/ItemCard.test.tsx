import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import { ItemCard } from "./ItemCard";
import type { Item } from "../types";

describe("ItemCard", () => {
  const item: Item = {
    id: "demo-item-17",
    title: "Blue notebook",
    description: "Found outside the library",
    location: "Library",
    type: "found",
    reportedBy: "Morgan Lee",
    reportedAt: "2026-10-30",
    isClaimed: false,
  };

  function ItemDetailsTest() {
    const { id } = useParams();
    return <p>Details for {id}</p>;
  }

  it("shows the status that matches the item's claimed state", () => {
    const claimedItem = { ...item, isClaimed: true };

    render(
      <MemoryRouter>
        <ItemCard item={claimedItem} onClaim={vi.fn()} variant="compact" />
      </MemoryRouter>,
    );

    expect(screen.getByText("Claimed")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Claim" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View details for Blue notebook" })).toHaveAttribute(
      "href",
      "/items/demo-item-17",
    );
  });

  it("navigates to the item's details when its ticket is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<ItemCard item={item} onClaim={vi.fn()} variant="compact" />} />
          <Route path="/items/:id" element={<ItemDetailsTest />} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("link", { name: "View details for Blue notebook" }));

    expect(screen.getByText("Details for demo-item-17")).toBeInTheDocument();
  });
});
