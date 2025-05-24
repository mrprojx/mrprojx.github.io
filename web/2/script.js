document.getElementById("trackBtn").addEventListener("click", trackFlight);

async function trackFlight() {
  const flightNumber = document.getElementById("flightInput").value.trim();
  const resultBox = document.getElementById("result");

  if (!flightNumber) {
    resultBox.innerHTML = "<p>Please enter a flight number.</p>";
    return;
  }

  resultBox.innerHTML = '<div class="spinner"></div><p class="loading-text">Loading SkyTrace data...</p>';

  try {
    const response = await fetch(`https://flight-backend-j49j.onrender.com/api/flight/${encodeURIComponent(flightNumber)}`);
    if (!response.ok) {
      if (response.status === 404) {
        resultBox.innerHTML = `<p>No flight data found for <strong>${flightNumber}</strong>.</p>`;
        return;
      }
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    resultBox.innerHTML = `
      <h3>Flight: ${data.callsign || flightNumber}</h3>
      <p><strong>Origin:</strong> ${data.origin || 'Unknown'}</p>
      <p><strong>Destination:</strong> ${data.destination || 'Unknown'}</p>
      <p><strong>Departure (UTC):</strong> ${data.departureTimeUTC || 'N/A'}</p>
      <p><strong>Arrival (UTC):</strong> ${data.arrivalTimeUTC || 'N/A'}</p>
      <p><strong>Altitude:</strong> ${data.altitude || 'N/A'}</p>
    `;
  } catch (error) {
    console.error(error);
    resultBox.innerHTML = "<p>Error contacting SkyTrace backend.</p>";
  }
}
