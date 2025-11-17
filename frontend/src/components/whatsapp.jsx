import React from "react";

function whatsapp() {

  const COLORS = {
  primary: "#B3541E", // Terracotta
  secondary: "#D6A74F", // Mustard Gold
  accent: "#A5A58D", // Sage Green
  text: "#3E2F1C", // Deep Brown
  background: "#F5EBDD", // Linen / Sand
};

  return (
    <div>
      {" "}
      <a
        href="https://wa.me/916394728933?text=Hi%20there!%20I%20would%20like%20to%20know%20more%20about%20Tehzeeb%20creations"
        target="_blank" // Added target blank
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
        aria-label="Chat on WhatsApp"
      >
        <div
          className="p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          style={{ background: COLORS.primary }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 32 32"
            fill="white"
          >
            <path d="M16 3C8.268 3 2 9.268 2 17c0 2.88.779 5.597 2.246 7.979L2 29l4.127-2.104C8.852 28.264 12.314 29 16 29c7.732 0 14-6.268 14-14S23.732 3 16 3zm0 24c-3.242 0-6.252-.883-8.851-2.413l-.609-.367-2.447 1.248.52-2.631-.39-.634C4.061 21.104 3.25 19.122 3.25 17 3.25 10.803 8.803 5.25 16 5.25S28.75 10.803 28.75 17 23.197 27.75 16 27.75zm7.69-8.527c-.417-.209-2.476-1.222-2.858-1.362-.381-.14-.658-.209-.936.209-.279.417-1.073 1.362-1.316 1.64-.242.279-.482.314-.899.105-.417-.209-1.763-.649-3.36-2.072-1.242-1.107-2.079-2.47-2.321-2.888-.242-.418-.026-.644.182-.853.187-.187.418-.487.627-.731.209-.243.278-.419.418-.698.14-.279.07-.523-.035-.732-.105-.209-.936-2.258-1.283-3.093-.338-.825-.681-.714-.936-.728-.242-.014-.523-.017-.803-.017-.279 0-.723.105-1.105.523-.382.418-1.45 1.418-1.45 3.462s1.484 4.021 1.69 4.301c.209.279 2.924 4.563 7.128 6.225.996.385 1.768.616 2.373.786.995.284 1.901.244 2.616.147.799-.108 2.476-1.012 2.825-1.99.349-.978.349-1.816.244-1.99-.104-.175-.379-.279-.796-.488z" />
          </svg>
        </div>
      </a>
    </div>
  );
}

export default whatsapp;
