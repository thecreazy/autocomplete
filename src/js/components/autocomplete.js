//ie10+ polifyll
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

import utils from '../utils';
const {
 debounce,
 fillPolifyll
} = utils;

//ie11 polifyll for Array.fill()
fillPolifyll()

export default class Autocomplete {

 constructor({
  elementSelector = "searchBox",
  resultsSelector = "searchResults",
  apiUrl
 }) {

  this.input = document.getElementById(elementSelector)
  this.ul = document.getElementById(resultsSelector)
  this.apiUrl = apiUrl

  //configuration for classes
  this.config = {
   li: '__li',
   hidden: '--hidden',
   termlist: 'autocomplete__termlist',
   link: '__link'
  }

  if (!this.input) console.error('[Autocomplete] No input founded')
  if (!this.ul) console.error('[Autocomplete] No result div founded')

  //automatic bind the function for the context
  this.attachEvents = this.attachEvents.bind(this)
  this.destroyEvents = this.destroyEvents.bind(this)
  this.attachResults = this.attachResults.bind(this)
  this.searchFunction = debounce(this.onKeyUp.bind(this), 200);
  this.search = this.search.bind(this)
  this.clearResults = this.clearResults.bind(this)
  this.appendResults = this.appendResults.bind(this)

  //attach the keyupevent
  this.attachEvents()
 }

 attachEvents() {
  this.input.addEventListener("keyup", this.searchFunction, false);
 }
 
 destroyEvents(){
  //destroy the events attached 
  this.input.removeEventListener("keyup", this.searchFunction);
 }

 onKeyUp() {
  const inputTerm = this.input.value.toLowerCase()
  this.search(inputTerm)
   .then(({
    results,
    term
   }) => this.attachResults(results, term))
   .catch(err => console.log(err))
 }

 search(inputTerm) {
  return new Promise((resolve, reject) => {
   if (!inputTerm) return resolve({
    results: [],
    term: ''
   })
   return fetch(`${this.apiUrl}?q=${inputTerm}`)
    .then(response => response.json())
    .then(data => resolve({
     results: data,
     term: inputTerm
    }))
    .catch(err => console.log(err))
  })
 }

 attachResults(results, term) {
  if (results.length > 0) {
   this.appendResults(results, term)
  } else if (results.length === 0 && !!term) {
   this.ul.innerHTML = `<li class="${this.config.li}"> No results for: <strong> ${term} </strong>`
   this.ul.classList.remove(this.config.hidden)
  } else {
   this.clearResults();
  }
 }

 clearResults() {
  this.ul.className = `${this.config.termlist} ${this.config.hidden}`;
  this.ul.innerHTML = '';
 }

 appendResults(results, term) {
  this.clearResults();
  results.forEach(result => {
   let element = document.createElement("li")
   element.classList.add(this.config.li)
   element.innerHTML = `
     <a class="${this.config.link}" target="_blank" href="${result.link}">${result.name.toLowerCase().replace(term,`<strong>${term}</strong>`)}</a>
    `
   this.ul.appendChild(element)
  });
  this.ul.classList.remove(this.config.hidden)
 }

}