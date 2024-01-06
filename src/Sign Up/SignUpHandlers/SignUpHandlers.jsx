import axios from 'axios';

export const OnSubmit = (data) => {
  axios.post('http://localhost:3001/signup', data, { withCredentials: true })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
      alert(error);
    });
};
