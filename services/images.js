import unsplash from '../lib/unsplash';

export async function getImage(query) {
   const res = await unsplash.search.getPhotos({ 
      query, 
      orientation: 'landscape',
      perPage: 1,
      contentFilter: 'low',
      orderBy: 'relevant'
   });

   return res.response.results[0].urls.thumb;
} 
