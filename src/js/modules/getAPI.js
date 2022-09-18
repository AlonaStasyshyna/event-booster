import axios from 'axios';
// ----------------------------------------
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'hMlAGZ78fb479kL5D8c5JYufMfeq7H9T';

const pageSize = 20;
let page = 1;

export async function getEvents(event, country) {
  const config = {
    baseURL: BASE_URL,
    params: {
      apikey: API_KEY,
      keyword: event,
      countryCode: country,
      size: pageSize,
      page: page,
    },
  };
  try {
    const request = await axios(config);
    console.log('API', request);
    return request;
  } catch (err) {
    console.log;
  }
}
