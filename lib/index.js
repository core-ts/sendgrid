"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SendGridMailService = (function () {
  function SendGridMailService(apiKey) {
    this.apiKey = apiKey;
    this.sendgrid = require('@sendgrid/mail');
    this.apiKey = apiKey;
    this.send = this.send.bind(this);
  }
  SendGridMailService.prototype.send = function (mailData) {
    this.sendgrid.setApiKey(this.apiKey);
    return this.sendgrid.send(mailData).then(function (result) {
      if (result[0].statusCode === 200 || result[0].statusCode === 202) {
        return true;
      }
      else {
        return false;
      }
    }, function (err) {
      throw err;
    });
  };
  return SendGridMailService;
}());
exports.SendGridMailService = SendGridMailService;
