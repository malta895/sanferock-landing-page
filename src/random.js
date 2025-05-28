const GOOGLE_API_KEY='AIzaSyASHd9h4n4AVXDFgUGT9K8Ie4zaHzepIBA'
      
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1iMoIDMyHRUSPY9WDSc_JDwQy2e4CrHQUX_AWp0oO6a4/values/A:B",
        {
          headers: new Headers({
            "accept":"application/json",
            "x-goog-api-key": GOOGLE_API_KEY
          })
        }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched JSON:', data);
        const randIdx = getRandomInt(data.values.length)
        const row = data.values[randIdx]
        document.getElementById("phrase_number").innerHTML = row[0]
        document.getElementById("phrase_text").innerHTML = row[1]
      }).catch(err => {
          document.getElementById("phrase_text").innerHTML = err
      })