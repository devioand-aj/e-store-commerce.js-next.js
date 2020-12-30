import FuzzySearch from 'fuzzy-search';

export const searcher = (targetArray, keys, searchQuery, isSensitive = false) => {
   const searcher = new FuzzySearch(targetArray, keys, { caseSensitive: isSensitive });

   return searcher.search(searchQuery);
}