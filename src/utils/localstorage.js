export function saveLocalStorage(key, value) {
  window.localStorage.setItem(key, value);
  console.log(`key: ${  key  }, value: ${  value}`);
}

export function loadLocalStorage(key) {
  return window.localStorage.getItem(key);
}

export function printLocalStorage(key) {
  console.log(window.localStorage.getItem(key));
}

export function assembleEvent() {
  const eventName = loadLocalStorage('eventName');
  const eventDesc = loadLocalStorage('eventDesc');
  const isGoing = loadLocalStorage('isGoing');
  const date = loadLocalStorage('date');
  const address = loadLocalStorage('address');
  const lat = loadLocalStorage('lat');
  const lon = loadLocalStorage('lon');
  const youtubeURL = loadLocalStorage('youtubeURL');

  const eventDetails = {
    title: eventName,
    desc: eventDesc,
    isGoing: isGoing,
    date: date,
    address: address,
    lat: lat,
    lon: lon,
    youtubeURL: youtubeURL
  };

  return eventDetails;
}
