const axios = require('axios');

const fetchData = async () => {
  try {
    const DATA_TAG = "MOOV_DATA";
    if (!localStorage.getItem(DATA_TAG)) {
      const url = "https://raw.githubusercontent.com/polarity-cf/moov-core/master/dataset_split.json";
      let request = await axios.get(url);
      // console.log(request.data.splice(0, 20));
      localStorage.setItem(DATA_TAG, JSON.stringify(request.data));
    }
    return JSON.parse(localStorage.getItem(DATA_TAG));
  } catch (err) {
    console.log(err)
  }
};

module.exports = fetchData;