import Vue from "vue";
import http from "./http";
let baseUrl = 'http://localhost:8088';

export default {

  	//图片显示
  	uploadURL(){
    	return baseUrl +"/sydx-ybt/sys/common/static/";
  	},
  	//文件显示
  	uploadFileURL(){
    	return baseUrl +"/sydx-ybt/sys/common/static/zcps/";
  	},
  	//上传路径
  	uploadFile() {
    	return baseUrl + "/sydx-ybt/sys/common/uploadfile";
  	},
  	//登录
  	login(url, params, callback) {
    	http.post(baseUrl + "/hometown-web/sys/login", params, callback);
  	},
  	//退出
  	loginOut(url, params, callback) {
    	http.post(baseUrl + "/hometown-web", params, callback);
  	},
};
