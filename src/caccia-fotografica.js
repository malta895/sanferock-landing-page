const GOOGLE_API_KEY = 'AIzaSyBav8-fMMisCW2j4QVIeKj2CaPxoEQHNDQ'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function fetchSheet() {
  const response = await fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1iMoIDMyHRUSPY9WDSc_JDwQy2e4CrHQUX_AWp0oO6a4/values/A:B",
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

function storePhrase(phrase) {
  localStorage.setItem("phrase", phrase)
}

function getStoredPhrase() {
  return localStorage.getItem("phrase")
}

function filterDay(values) {
  const day = new Date().getDay()
  const hours = new Date().getHours()
  const isFriday = day === 5 || (day === 6 && hours <= 6)
  const isSaturday = (day === 6 && hours > 6) || day === 7
  return values.filter(val => {
      const [,dayFilter] = val
      if (dayFilter === 'venerdì' && !isFriday) {
        return false
      }
      if (dayFilter === 'sabato' && !isSaturday) {
        return false
      }
      return true
  })
}

async function getRandomPhrase() {
    const data = await fetchSheet();
    console.log('Fetched JSON:', data);

    const { values } = data;

    const dayValues = filterDay(values)
    console.log('dayValues', dayValues)

    const randIdx = getRandomInt(dayValues.length)
    const row = dayValues[randIdx]

    return row[0]
}

async function retrievePhrase() {
  const storedPhrase = getStoredPhrase()
  if (storedPhrase){
    return storedPhrase
  }
  const phrase = await getRandomPhrase()
  storePhrase(phrase)
  return phrase
}

async function init() {
  try {
    const phrase = await getRandomPhrase()
    document.getElementById("phrase_text").innerHTML = phrase
  } catch (err) {
    document.getElementById("phrase_text").innerHTML = err;
  }
}

init()
