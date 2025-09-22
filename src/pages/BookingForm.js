import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext, AuthContext } from "../App";

export default function BookingForm({ i18n }) {
  const { api } = useContext(ApiContext);
  const { auth } = useContext(AuthContext);
  const { id } = useParams(); // service ID from URL

  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  // Fetch service details to display its name
  useEffect(() => {
    fetch(`${api}/api/services/${id}`, {
      headers: { "Accept": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch(() => setMessage("Failed to load service details"));
  }, [api, id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!auth.token) {
      setMessage("Please login first");
      return;
    }

    try {
      const res = await fetch(`${api}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          service_id: id,
          date,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Booking failed");

      setMessage("Booking confirmed!");
      setDate("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {i18n?.bookService || "Book a Service"}
      </h2>

      {service && (
        <p className="mb-2">
          Booking: <strong>{service.name}</strong> (${service.price})
        </p>
      )}

      {message && <p className="mb-2 text-blue-600">{message}</p>}

      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="block mb-1">
            {i18n?.chooseDate || "Choose Date:"}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {i18n?.confirmBooking || "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
