const axios = require('axios');

const fetchData = async () => {
  try {
    const DATA_TAG = "MOOV_DATA";
    if (!localStorage.getItem(DATA_TAG)) {
      const url = "https://raw.githubusercontent.com/polarity-cf/moov-core/master/dataset_split.json";
      let request = await axios.get(url);
      localStorage.setItem(DATA_TAG, JSON.parse(request.data));
    }

    return localStorage.getItem(DATA_TAG);
  } catch (err) {
    console.log(err)
  }
};

module.exports = fetchData;