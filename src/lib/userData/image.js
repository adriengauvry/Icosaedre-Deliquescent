import request from 'request';
import Cookie from "js-cookie";
import { API_PATH } from './manager';

class Image {
  _user;
  set user(val) { this._user = val }
  id;
  name;
  data;
  owner;
  
  constructor(id, name, data, owner) {
    this.id = id;
    this.name = name;
    this.data = data;
    this.owner = owner;
  }

  get token() { return Cookie.get('token') }

  /**
   * Delete the image.
   * @param {function(any):void} callback 
   */
  delete(callback) {
    request.delete(`${API_PATH}/images/${this.id}`, (err, res, body)=>{
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(JSON.parse(body));
      this._user.loadImages(callback);
    }).auth(null, null, true, this.token);
  }
}

export default Image;
