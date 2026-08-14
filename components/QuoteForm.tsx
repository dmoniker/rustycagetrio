"use client";

import { useEffect, useState } from "react";
import { eventTypes, site } from "@/lib/content";

export function QuoteForm() {
  const [nextUrl, setNextUrl] = useState("https://www.rustycagetrio.com/thanks");

  useEffect(() => {
    setNextUrl(`${window.location.origin}/thanks`);
  }, []);

  return (
    <form
      className="form"
      action="https://formsubmit.co/rustycagetrio@gmail.com"
      method="POST"
    >
      <input type="hidden" name="_next" value={nextUrl} />
      <input
        type="hidden"
        name="_subject"
        value="Quote request — Rusty Cage Trio"
      />
      <input type="hidden" name="_template" value="table" />
      <input type="text" name="_honey" className="hp" tabIndex={-1} autoComplete="off" />

      <div className="form-row">
        <label>
          Name
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <div className="form-row">
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Event type
          <select name="event_type" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {eventTypes.map((type) => (
              <option key={type.value} value={type.label}>
                {type.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Date
          <input name="date" type="date" />
        </label>
        <label>
          Hours needed
          <input name="hours" type="text" placeholder="90 minutes, 2 hours…" />
        </label>
      </div>

      <label>
        Venue / city
        <input name="venue" type="text" placeholder="Winery, backyard, hall — and city" />
      </label>

      <label>
        Notes
        <textarea name="notes" placeholder="Guest count, indoor/outdoor, power, song requests…" />
      </label>

      <button className="btn" type="submit">
        Send quote request
      </button>

      <p className="fine">
        Or write {site.email} directly. We reply from the same address.
      </p>
    </form>
  );
}
