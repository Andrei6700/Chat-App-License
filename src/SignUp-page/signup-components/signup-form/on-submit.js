import axios from 'axios';

export const OnSubmit = (data) => {
  console.log(data)
  axios.post('http://localhost:8081/signup', data)
    .then(response => {
      console.log(response.data);
      alert('ok!');
    })
    .catch(error => {
      console.log(error);
      alert('An error occurred ');
    });
};
export const OnChange = (e) => {
    e.preventDefault();
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,

        }
        console.log(formData);
        OnSubmit(formData);
        };