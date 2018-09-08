const https = require("https");
const axios = require("axios");
const vfs = require("fs");

let instance;

if ("development" === process.env.NODE_ENV) {
  instance = axios.create();
} else {
  const caCert = vfs.readFileSync(
    "/var/run/secrets/kubernetes.io/serviceaccount/service-ca.crt",
    "utf8"
  );
  instance = axios.create({ httpsAgent: new https.Agent({ ca: caCert }) });
}

export async function getQuestions() {
  try {
    const url =
      process.env.VUE_APP_QUESTIONS_API_URL ||
      "http://myapi.example.com/api/questions";
    const res = await instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getFrames() {
  try {
    const url =
      process.env.VUE_APP_FRAMES_API_URL ||
      "http://myapi.example.com/api/frames";
    const res = await instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getFrame(id) {
  try {
    const url =
      `${process.env.VUE_APP_FRAMES_API_URL}/${id}` ||
      `http://myapi.example.com/api/frames/${id}`;
    const res = await instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function saveUserResponse(fromData) {
  try {
    const res = await instance.post(
      `${process.env.VUE_APP_COLLABORATORS_API_URL}`,
      fromData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getAvatars() {
  try {
    const res = await instance.get(
      `${process.env.VUE_APP_COLLABORATORS_API_URL}/avatars`
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
