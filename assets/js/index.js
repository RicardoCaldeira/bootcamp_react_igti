import axios from "axios";

let res = await axios.get("https://jsonplaceholder.typicode.com/users");

console.log(res.data);