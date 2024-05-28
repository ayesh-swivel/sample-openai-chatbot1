import { IMessages } from "@/app/page";
import axios from "axios";

const postMessage = async (data: IMessages) => {
  return await axios
    .post("http://localhost:3000/api/chat", data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const AzureApiService = {
  postMessage,
};

export default AzureApiService;
