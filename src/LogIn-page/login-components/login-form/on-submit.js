import axios from 'axios';

export const OnSubmit = (data) => {
  console.log(data)
  axios.post('http://localhost:8081/login', data)
    .then(response => {
      console.log(response.data);
      alert('ok');
    })
    .catch(error => {
      console.log(error);
      alert('An error');
    });
};
export const OnChange = (e) => {
    e.preventDefault();
    const formData = {
        email: e.target.email.value,
        password: e.target.password.value,

        }
        console.log(formData);
        OnSubmit(formData);
        };