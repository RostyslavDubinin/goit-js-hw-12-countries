
import { error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const debounce = require('lodash.debounce');


import countryCardTpl from './templates/country-card.hbs';
import allCountryCardTpl from './templates/allContries.hbs';
import API from './js/fetchCountries.js';
import getRefs from './js/get-refs.js';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));



function onSearch(e) {
  e.preventDefault();

  // const form = e.currentTarget;
  // const searchQuery = form.elements.query.value;
  const searchQuery = e.target.value;
  





// API.fetchCountries(searchQuery).then(GetData);
// function GetData (qwe) {qwe.length;};


if (searchQuery.length > 2){
  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    // .finally(() => form.reset());
    
}
else {
    API.fetchCountries(searchQuery)
    .then(renderAllCountryCardTpl)
    .catch(onFetchError)
    // .finally(() => form.reset());
}
}

function renderCountryCard(countries) {
    const markup = countryCardTpl(countries);
    refs.cardContainer.innerHTML = markup;
    // console.log(countries);
    
}

function renderAllCountryCardTpl(countries) {
    const markup = allCountryCardTpl(countries);
    refs.cardContainer.innerHTML = markup;
    
}

function onFetchError(eror) {
    error({
      text: 'Too many matches found. Please enter a more specific query!'
    });
  }

  

  