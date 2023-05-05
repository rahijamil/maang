let fetchData = new Promise((resolve, reject) => {
  let x = 0;

  if (x == 0) {
    resolve("OK");
  } else {
    reject("Error");
  }
});

const fetching = async () => {
  await fetchData
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};

fetching();
