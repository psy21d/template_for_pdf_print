import axios from 'axios'

/*
  name
  html
*/
export default function postToServer(data) {
  axios({
    method: 'post',
    url: 'localhost:4500/api/htmlToPdf',
    data
  });
}