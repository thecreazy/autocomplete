import utils from '../utils'
const {
 debounce
} = utils

export default class Autocomplete {

 constructor({
  elementSelector = "searchBox",
  resultsSelector = "searchResults",
  apiUrl
 }) {

  this.input = document.getElementById(elementSelector)
  this.ul = document.getElementById(resultsSelector)
  this.apiUrl = apiUrl

  if (!this.input) console.error('[Autocomplete] No input founded')
  if (!this.ul) console.error('[Autocomplete] No result div founded')

  this.attachEvents = this.attachEvents.bind(this)
  this.attachResults = this.attachResults.bind(this)
  this.searchFunction = debounce(this.onKeyUp.bind(this), 200);
  this.search = this.search.bind(this)
  this.clearResults = this.clearResults.bind(this)
  this.appendResults = this.appendResults.bind(this)

  this.attachEvents()
 }

 attachEvents() {
  this.input.addEventListener("keyup", this.searchFunction, false);
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
   this.ul.innerHTML = `<li> No results for: <strong> ${term} </strong>`
   this.ul.classList.remove('hidden')
  } else {
   this.clearResults();
  }
 }

 clearResults() {
  this.ul.className = "term-list hidden";
  this.ul.innerHTML = '';
 }

 appendResults(results, term) {
  this.clearResults();
  results.forEach(result => {
    let element = document.createElement("li")
    element.innerHTML = `
     <a target="_blank" href="${result.link}">${result.name.toLowerCase().replace(term,`<strong>${term}</strong>`)}</a>
    `.trim()
    this.ul.appendChild(element)
  });
  this.ul.classList.remove('hidden')
 }

}