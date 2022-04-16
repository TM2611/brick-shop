export async function fetchSingles() {
  const filter = document.querySelector('#colour-filter');
  const colour = filter.options[filter.selectedIndex].text.toLowerCase();
  const sort = document.querySelector('#sort');
  const regex = /[)( ]/g ; //Remove any brackets or spaces
  const sortType = sort.options[sort.selectedIndex].text.replace(regex, '');
  if (colour === 'any' && sortType === 'MostPopular') {
    return await fetchAllSingles();
  }
  else if (colour === 'any' && sortType !== 'MostPopular'){
    return await fetchSingleSorted(sortType);
  }
  else if (colour !== 'any' && sortType !== 'MostPopular'){ 
    return await fetchSingleColourSorted(colour, sortType);
  }
  //Most popular is default, no sorting needed
  return await fetchSingleColour(colour)
}

export async function fetchAllSingles() {
  const response = await fetch('/single'); // By Most Popular
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchSingleColour(colour){
  const response = await fetch('/single/colour/' + colour);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchSingleColourSorted(colour, sortType){
  const response = await fetch(`/single/colour/${colour}/${sortType}`);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

async function fetchSingleSorted(sortType){
  const response = await fetch(`/single/sort/${sortType}`);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}