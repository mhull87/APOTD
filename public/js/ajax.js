const apiButton = document.getElementById('viewapotd');
const outputDiv = document.getElementById('outputdiv');
const date = document.getElementById('date');
const title = document.getElementById('title');
const explination = document.getElementById('explination');
const hdurl = document.getElementById('hdurl');

const apiURL = 'https://api.nasa.gov/planetary/apod?api_key=';
//const api_key = config.NASA_API_KEY;
const api_key = 'xzHy9vEyRWbxxe1hhwMicVfHJeVWn5WbS3zDQ2nM';

apiButton.addEventListener('click', () => {
  fetch(apiURL + api_key)
  .then(response => {
    outputDiv.innerHTML = 'Waiting for response...';
    if(response.ok) {
      outputDiv.innerHTML = '';
      return response;
    }
    throw Error(response.statusText);
  })
  .then(response => response.json())
  .then(data => console.log(data))
 // .then(data => display(data))
 // .then(data => date.innerText = data.date)
 // .then(data => title.textContent = data.title)
 // .then(data => explination.innerHTML = data.explanation)
 // .then(data => hdurl.src = data.hdurl)
  .catch(error => console.log('There was an error:', error))
}, false);

const fetchData = async () => {
  try {
    const response = await fetch(`${apiURL}${api_key}`)
    const data = await response.json()
    display(data)
  }
  catch (err) {
    console.log(err)
  }
}

const display = data => {
  date.textContent = data.date;
  title.textContent = data.title;
  hdurl.src = data.hdurl;
  explination.textContent = data.explanation;
}

fetchData()