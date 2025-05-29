const GOOGLE_API_KEY = 'AIzaSyASHd9h4n4AVXDFgUGT9K8Ie4zaHzepIBA'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function fetchSheet() {
  const response = await fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1iMoIDMyHRUSPY9WDSc_JDwQy2e4CrHQUX_AWp0oO6a4/values/A:A",
    {
      headers: new Headers({
        "accept": "application/json",
        "x-goog-api-key": GOOGLE_API_KEY
      })
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}

async function init() {
  try {
    const data = await fetchSheet();
    console.log('Fetched JSON:', data);

    const { values } = data;

    const randIdx = getRandomInt(values.length)
    const row = values[randIdx]

    document.getElementById("phrase_text").innerHTML = row[0]
  } catch (err) {
    document.getElementById("phrase_text").innerHTML = err;
  }
}

init()