const SERVER_ADDRESS = "http://localhost:8080";
export const httpGet = async (uri) => {
  let res = fetch(SERVER_ADDRESS + uri)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

export const httpPost = async (uri, postInfo) => {
    console.log("body: ", JSON.stringify(postInfo))
  let res = fetch(SERVER_ADDRESS + uri, {
    method: "POST",
    body: JSON.stringify(postInfo),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

//   async function doPost () {
//     const res = await fetch('https://httpbin.org/post', {
//         method: 'POST',
//         body: JSON.stringify({
//             foo,
//             bar
//         })
//     })

//     const json = await res.json()
//     result = JSON.stringify(json)
// }
