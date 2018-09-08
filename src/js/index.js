import '../style/index.scss'

import Autocomplete from  './components/autocomplete'
import BeerCanvas from  './components/beerCanvas'

new Autocomplete({
 elementSelector: "searchBox",
 resultsSelector: "searchResults",
 apiUrl: 'http://localhost:3000/beers'
})

new BeerCanvas()