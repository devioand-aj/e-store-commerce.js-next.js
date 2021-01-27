import FuzzySearch from 'fuzzy-search';
import _ from 'lodash';

describe('/lib/fuzzy-search', () => {
   it('should return id 1 if search query is mobile', () => {
      const targetArray = [
         { id: 1, title: 'Mobile' },
         { id: 2, title: 'Laptop' }
      ];

      const searcher = new FuzzySearch(targetArray, ['title']);
      const result = searcher.search('Mobile');

      expect(result[0]).toHaveProperty("id", 1);
   });

   it('should return id 2 if search query is laptop', () => {
      const targetArray = [
         { id: 1, title: 'Mobile' },
         { id: 2, title: 'Laptop' }
      ];

      const searcher = new FuzzySearch(targetArray, ['title']);
      const result = searcher.search('Laptop');

      expect(result[0]).toHaveProperty("id", 2);
   });

   it('should return empty array if search query is invalid', () => {
      const targetArray = [
         { id: 1, title: 'Mobile' },
         { id: 2, title: 'Laptop' }
      ];

      const searcher = new FuzzySearch(targetArray, ['title']);
      const result = searcher.search('xyz');

      expect(result).toHaveLength(0);
   });
})
