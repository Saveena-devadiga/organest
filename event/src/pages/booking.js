import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/booking.css";

const eventTypes = [
  { name: "Wedding", img: "/images/wedding.jpg" },
  { name: "Birthday", img: "/images/Birthday.jfif" },
  { name: "Engagement", img: "/images/exchange.jpg" },
];

const services = [
  { name: "Bridal Makeup", img: "/images/bridal.jpg", price: 8000 },
  { name: "Photography", img: "/images/photo.jpg", price: 12000 },
  { name: "Food Section", img: "/images/food.jpg" },
  { name: "Invitation Card", img: "/images/card.jfif" },
  { name: "Decoration", img: "/images/th3.jpg" },
];

const customPrices = {
  "Invitation Card": (d) => (parseInt(d.qty) || 0) * 50,
  "Food Section": (d) =>
    (d.type === "veg" ? 300 : d.type === "nonveg" ? 500 : 0) * (parseInt(d.qty) || 0),
  Decoration: (d) => (d.type === "simple" ? 10000 : d.type === "luxury" ? 20000 : 0),
};

export default function Booking() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState({});
  const [info, setInfo] = useState({ name: "", email: "", phone: "", location: "", date: "" });
  const navigate = useNavigate();

  useEffect(() => window.scrollTo(0, 0), []);

  const toggleService = (name) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
    setServiceDetails((prev) =>
      prev[name]
        ? (() => {
            const copy = { ...prev };
            delete copy[name];
            return copy;
          })()
        : { ...prev, [name]: { qty: "", type: "" } }
    );
  };

  const calculateTotal = () =>
    selectedServices.reduce((total, name) => {
      const detail = serviceDetails[name] || {};
      return (
        total +
        (customPrices[name]
          ? customPrices[name](detail)
          : services.find((s) => s.name === name)?.price || 0)
      );
    }, 0);

  const handleSubmit = async () => {
    const { name, email, phone, location, date } = info;
    if (!name || !email || !phone || !location || !date || !/^\d{10}$/.test(phone) || !/^\S+@\S+\.\S+$/.test(email))
      return alert("Please fill in valid details.");
    if (!selectedServices.length) return alert("Select at least one service.");

    const res = await fetch("http://localhost:5000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...info,
        eventType: selectedEvent,
        selectedServices,
        serviceDetails,
        total: calculateTotal(),
      }),
    });
    const result = await res.json();
    result.message ? navigate("/thankyou") : alert("Booking failed.");
  };

  const renderServiceDetails = (name, detail) => {
    const update = (field, val) =>
      setServiceDetails((prev) => ({
        ...prev,
        [name]: { ...prev[name], [field]: val },
      }));

    const safeQty = detail.qty === undefined ? "" : detail.qty;

    if (name === "Invitation Card")
      return (
        <>
          <label>Quantity:</label>
          <input
            type="text"
            inputMode="numeric"
            value={safeQty}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) update("qty", value);
            }}
          />
          <div>Amount: ₹{customPrices[name](detail)}</div>
        </>
      );

    if (name === "Food Section")
      return (
        <>
          <label>Type:</label>
          <select value={detail.type} onChange={(e) => update("type", e.target.value)}>
            <option value="">Select</option>
            <option value="veg">Veg (₹300)</option>
            <option value="nonveg">Non-Veg (₹500)</option>
          </select>
          <label>Quantity:</label>
          <input
            type="text"
            inputMode="numeric"
            value={safeQty}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) update("qty", value);
            }}
          />
          <div>Amount: ₹{customPrices[name](detail)}</div>
        </>
      );

    if (name === "Decoration")
      return (
        <>
          <label>Type:</label>
          <select value={detail.type} onChange={(e) => update("type", e.target.value)}>
            <option value="">Select</option>
            <option value="simple">Simple (₹10,000)</option>
            <option value="luxury">Luxury (₹20,000)</option>
          </select>
          <div>Amount: ₹{customPrices[name](detail)}</div>
        </>
      );

    const price = services.find((s) => s.name === name)?.price;
    return <div>Amount: ₹{price}</div>;
  };

  return (
    <div className="booking-page">
      <h2>Book Your Event</h2>

      <h3>Select Event Type</h3>
      <div className="grid">
        {eventTypes.map(({ name, img }) => (
          <div key={name} className={`card ${selectedEvent === name ? "selected" : ""}`} onClick={() => setSelectedEvent(name)}>
            <img src={img} alt={name} />
            <p>{name}</p>
          </div>
        ))}
      </div>

      <h3>Select Services</h3>
      <div className="grid">
        {services.map(({ name, img, price }) => {
          const selected = selectedServices.includes(name);
          const detail = serviceDetails[name] || {};
          return (
            <div key={name} className={`card ${selected ? "selected" : ""}`} onClick={() => toggleService(name)}>
              <img src={img} alt={name} />
              <p>{name}</p>
              <small>{price ? `Price: ₹${price}` : "Custom Pricing"}</small>
              {selected && (
                <div className="service-details" onClick={(e) => e.stopPropagation()}>
                  {renderServiceDetails(name, detail)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h3>Your Information</h3>
      <div className="user-info">
        {["name", "email", "phone", "location", "date"].map((field) => (
          <input
            key={field}
            type={field === "date" ? "date" : "text"}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={info[field]}
            maxLength={field === "phone" ? 10 : undefined}
            min={field === "date" ? new Date().toISOString().split("T")[0] : undefined}
            onChange={(e) =>
              setInfo((prev) => ({
                ...prev,
                [field]: field === "phone" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value,
              }))
            }
          />
        ))}
      </div>

      {selectedEvent && (
        <div className="summary-box">
          <h3>Booking Summary</h3>
          <p><strong>Event Type:</strong> {selectedEvent}</p>
          <strong>Selected Services:</strong>
          <ul>
            {selectedServices.map((name) => {
              const d = serviceDetails[name] || {};
              const price = customPrices[name]
                ? customPrices[name](d)
                : services.find((s) => s.name === name)?.price || 0;
              return (
                <li key={name}>
                  {name}
                  {d.type && ` (${d.type})`}
                  {d.qty && ` - Qty: ${d.qty}`} : ₹{price}
                </li>
              );
            })}
          </ul>
          <div className="summary-user">
            {["name", "email", "phone", "location", "date"].map((k) => (
              <p key={k}>{k[0].toUpperCase() + k.slice(1)}: {info[k]}</p>
            ))}
          </div>
        </div>
      )}

      <h3>Total Price: ₹{calculateTotal()}</h3>
      <button onClick={handleSubmit}>Submit Booking</button>
    </div>
  );
}
