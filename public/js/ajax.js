const apiButton = document.getElementById('viewapotd');
const outputDiv = document.getElementById('outputdiv');
const date = document.getElementById('date');
const title = document.getElementById('title');
const explination = document.getElementById('explination');
const hdurl = document.getElementById('hdurl');

const apiURL = 'https://api.nasa.gov/planetary/apod?concept_tags=true&api_key=';
//const api_key = config.NASA_API_KEY;
const api_key = 'xzHy9vEyRWbxxe1hhwMicVfHJeVWn5WbS3zDQ2nM';

const fetchData = async () => {
  try {
    const response = await fetch(`${apiURL}${api_key}`)
    const data = await response.json()
    display(data)
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

function display(data) {
  date.textContent = data.date;
  title.textContent = data.title;
  hdurl.src = data.hdurl;
  explination.textContent = data.explanation;
}

const searchURL = 'https://api.nasa.gov/planetary/apod?count=10&api_key=';
//const api_key = config.NASA_API_KEY;

const search = async () => {
  try {
    outputDiv.innerHTML = 'Loading...';
    const response = await fetch(`${searchURL}${api_key}`)
    const data = await response.json()
    searchResults(data)
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

function searchResults(data) {
  outputDiv.innerHTML = '';
  document.getElementById('detailsdiv').classList.add('hidden');
  for (var i = 0; i < data.length; i++) {
    if (data[i].media_type == "image") {
      var ul = document.getElementById('photoul');
      var li = document.createElement('li');
      var img = document.createElement('img');
      var hr = document.createElement('hr');
      img.src = data[i].hdurl;

      li.innerHTML = `${data[i].title}<br><button class='detailsbtn' onclick='details(${JSON.stringify(data[i]).replace(/[\']/g, "&apos;")})'>Details</button><br><br>`;

      ul.appendChild(li);
      li.appendChild(img);
      li.appendChild(hr);
    }
  }
}

function details(data) {
  document.getElementById('detailsdiv').classList.remove('hidden');
  document.getElementById('photoul').innerHTML = "";
  document.getElementById('title').innerHTML = data.title;
  document.getElementById('date').innerHTML = data.date;
  document.getElementById('explanation').innerHTML = data.explanation;
  document.getElementById('photo').src = data.hdurl;

  if (data.copyright) {
    document.getElementById('copyright').innerHTML = `&copy; ${data.copyright}`;
  } else {
    document.getElementById('copyright').innerHTML = '';
  }
}