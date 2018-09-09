import '../style/index.scss'

import Autocomplete from  './components/autocomplete'
import BeerCanvas from  './components/beerCanvas'

const firstAutocomplete = new Autocomplete({
 elementSelector: "searchBox",
 resultsSelector: "searchResults",
 apiUrl: 'http://localhost:3000/beers'
})

new BeerCanvas()


window.onbeforeunload = function(){
  firstAutocomplete.destroyEvents()
}