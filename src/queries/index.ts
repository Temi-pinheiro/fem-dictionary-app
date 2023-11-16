import axios from 'axios';

const baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const getWord = async (keyword: string) => {
  const config = {
    method: 'GET',
    url: baseUrl + keyword,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    throw err.response.data;
  }
};
