const eventsAPI = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-FTW-ET-WEB-FT/events';
// const newEvent = { id:55435, name: 'Something Fun', description: 'An event where we speak english rather than latin and there is snacks',cohortId:1621, date:"2025-01-28T11:00:00.000Z", location: "The zoom room"};

const state = {
  events: []
}

const getEvents = async() => {
  const api = await fetch(eventsAPI);
  const events = await api.json();
  state.events = events.data;
  state.events.sort((a,b) => {})
}


const renderEvents = async() => {
  await getEvents();
  const body = document.querySelector('body > main');
  body.innerHTML = '';
  state.events.forEach((event) => {
    const elements = formatParty(event);
    elements.forEach((ele) => {body.append(ele)});
  });
}

//Returns an HTML element array that properly formats the party details
const formatParty = (party) => {
  const elements = [];
  const eventName = document.createElement('h2');
  eventName.innerText = capitalized(party.name);
  elements.push(eventName);
  const dateOf = document.createElement('p');
  dateOf.innerText = extractTime(party.date);
  elements.push(dateOf);
  const loc = document.createElement('p');
  loc.innerText = party.location;
  elements.push(loc);
  const desc = document.createElement('p');
  desc.innerText = party.description;
  elements.push(desc);
  elements.push(document.createElement('br'));
  return elements;
}

//Capitalizes the first line of code for a given string. Used for formatting the names
const capitalized = (str) => {
  const arr = str.split('');
  return arr.map( (char, index) => {
    if(arr[index-1]===undefined || arr[index-1]===' '){
      return char.toUpperCase();
    }else{
      return char;
    }
  }).join('');
}

//Extracts and formats the given time element, returning it as a string
const extractTime = (str) => {
  const date = str.slice(5,10) + '-' + str.slice(0,4);
  let hour = Number(str.slice(11,13));
  if(hour>12){
    hour -= 12;
    hour += ''+ str.slice(13,16)+ 'PM';
  }else{
    hour += ''+ str.slice(13,16)+ 'AM';
  }
  return date + " at " + hour;
}

renderEvents();