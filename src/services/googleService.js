import { google } from "googleapis";

export default class GoogleService {
  constructor(clientID, clientSecret) {
    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.initializeClient();
  }

  initializeClient() {
    this.oauth2Client = new google.auth.OAuth2(
      this.clientID,
      this.clientSecret,
      `${process.env.HOST}/api/google/callback`
    );
  }

  getScopes() {
    return [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];
  }

  getRedirectUrl() {
    return this.oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",

      // If you only need one scope you can pass it as a string
      scope: this.getScopes,

      // Add the client ID to ensure the correnct credentials are used on server response (callback)
      state: this.clientID,
    });
  }
}
