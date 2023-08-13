import axios from 'axios';

export const OnSubmit = (data) => {
  console.log(data);
  return axios.post('http://localhost:8081/signup', data);
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