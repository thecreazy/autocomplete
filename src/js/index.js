import '../style/index.scss'

import Autocomplete from  './components/autocomplete'

new Autocomplete({
 elementSelector: "searchBox",
 resultsSelector: "searchResults",
 apiUrl: 'http://localhost:3000/beers'
})