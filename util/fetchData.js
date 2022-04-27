const axios = require('axios');

const fetchData = async () => {
  const url = "https://raw.githubusercontent.com/polarity-cf/moov-core/master/dataset_split.json";

  let request = await axios.get(url);

  console.log(request.data);
}

fetchData()