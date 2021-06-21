import axios from 'axios'

/*
  name
  html
*/
export default async function postToServer(data) {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:4500/api/htmlToPdf',
    responseType: 'blob',
    data
  });
  const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', 'generate.pdf'); 
  document.body.appendChild(link);
  link.click();
  link.remove();
}