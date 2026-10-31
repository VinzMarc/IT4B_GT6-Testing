import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "../api/client";

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const itemId = id ?? "";
  const itemQuery = useQuery({
    queryKey: ["items", itemId],
    queryFn: () => getItem(itemId),
    enabled: Boolean(id),
  });
  const item = itemQuery.data;

  if (itemQuery.isLoading) {
    return (
      <main className="item-detail-page">
        <p className="item-detail-state">Finding the right campus notice...</p>
      </main>
    );
  }

  if (itemQuery.error) {
    return (
      <main className="item-detail-page">
        <p className="item-detail-state item-detail-state--error">
          Could not load this ticket: {itemQuery.error.message}
        </p>
        <Link className="item-detail-back" to="/items">← Back to the board</Link>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="item-detail-page">
        <section className="item-detail-state">
          <span className="item-detail-state__spark" aria-hidden="true">✳</span>
          <h1>This ticket wandered off</h1>
          <p>No campus item matches that ID. Head back to the board to keep looking.</p>
          <Link className="item-detail-back" to="/items">← Back to the board</Link>
        </section>
      </main>
    );
  }

  const formattedDate = new Date(`${item.reportedAt}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="item-detail-page">
      <Link className="item-detail-back" to="/items">
        <span aria-hidden="true">←</span> Back to the board
      </Link>

      <article className={`item-detail-card item-detail-card--${item.type}`}>
        <div className="item-detail-art" aria-hidden="true">
          <span className="item-detail-art__spark item-detail-art__spark--one">✳</span>
          <span className="item-detail-art__spark item-detail-art__spark--two">✦</span>
          <div className="item-detail-art__orbit" />
          <div className="item-detail-art__object">
            {item.type === "found" ? "⌕" : "↗"}
          </div>
          <span className="item-detail-art__sticker">
            {item.type === "found" ? "FOUND!" : "MISSING"}
          </span>
          <span className="item-detail-art__caption">CAMPUS BOARD · {item.type.toUpperCase()}</span>
        </div>

        <div className="item-detail-content">
          <div className="item-detail-content__topline">
            <p className="panel-kicker">{item.type === "lost" ? "A neighbor is looking for" : "A kind neighbor found"}</p>
            <span className={`item-detail-status ${item.isClaimed ? "item-detail-status--claimed" : ""}`}>
              <span className="status-dot" />
              {item.isClaimed ? "Claimed" : "Still looking"}
            </span>
          </div>

          <h1>{item.title}</h1>
          <p className="item-detail-description">
            {item.description?.trim() || "No extra details were added. Check the location and reach out to the reporter."}
          </p>

          <div className="item-detail-facts">
            <div className="item-detail-fact item-detail-fact--location">
              <span className="item-detail-fact__icon" aria-hidden="true">⌖</span>
              <div>
                <span className="item-detail-fact__label">Last seen around</span>
                <strong>{item.location}</strong>
              </div>
            </div>
            <div className="item-detail-fact">
              <span className="item-detail-fact__icon item-detail-fact__icon--mint" aria-hidden="true">☺</span>
              <div>
                <span className="item-detail-fact__label">Posted by</span>
                <strong>{item.reportedBy}</strong>
              </div>
            </div>
          </div>

          <div className="item-detail-footer">
            <span>Added to the board <strong>{formattedDate}</strong></span>
            <span className="item-detail-footer__heart" aria-hidden="true">made with campus kindness ♥</span>
          </div>
        </div>
      </article>
    </main>
  );
}
