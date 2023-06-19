const API_KEY = '35579706-8f6d810a90183242eb7243061';

export function getImages(request, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${request}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
