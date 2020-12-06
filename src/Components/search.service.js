
import axios from "axios";


export default function searchMovies(url, query, pageNumber) {

  let params = { page: pageNumber }
  if (query) {
    params = { ...params, query: query }
  }
  
  if(url.includes('search') && !query){
    return Promise.resolve([])
  }

  return axios({
    method: "GET",
    url: url,
    params: params,
  }).then((res) => {
    return res
  }).catch((e) => {
    return []
  });
}
