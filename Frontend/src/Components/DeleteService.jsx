import axios from "axios";


const DELETE_REST_API_URL = "http://localhost:8080/deleteprod/"

const deleteProduct = (prodId) => {
    return axios.delete(DELETE_REST_API_URL + prodId)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        window.alert(error);
      });
  };

export default deleteProduct;