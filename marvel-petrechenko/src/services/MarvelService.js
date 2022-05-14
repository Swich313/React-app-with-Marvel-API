import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, request, error} = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=614a7384bd3cf06c1d7e615cc9f129ca';
   const _baseOffset = 210;




    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'So sorry, there is no description right now',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            // thumbnail: `${res.data.results[0].thumbnail.path}.${res.data.results[0].thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter}
}

export default useMarvelService;