import axios from "axios";

export default class Request {
  constructor() {
    this.requestURL = "https://s3.ap-northeast-2.amazonaws.com/mygumi/static/";
  }

  getJSON(path) {
    return new Promise(reslove => {
      let request = this.requestURL + path;
      axios.get(request).then(res => {
        reslove(res.data);
      });
    });
  }
}
