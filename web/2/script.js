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
    // Replace with your real backend endpoint for flight tracking
    const response = await fetch("https://flight-backend-j49j.onrender.com/api/hello");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    resultBox.innerHTML = `<p>🛬 ${data.message}</p>`;
  } catch (error) {
    resultBox.innerHTML = "<p>Error contacting SkyTrace backend.</p>";
  }
}
