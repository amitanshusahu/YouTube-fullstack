import { TOKEN, loadSecrets } from "../secret";

export default class Api {

  payload: any;
  url: string;

  constructor(payload: Object | FormData, url: string) {
    this.payload = payload;
    this.url = url;
  }

  async postJson(): Promise<any> {
    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(this.payload)
    });
    const jsonRes = await res.json();

    return jsonRes;
  }

  async postAuthjson() : Promise<any>{
    loadSecrets();
    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `${TOKEN}`
      },
      body: JSON.stringify(this.payload)
    });
    const jsonRes = await res.json();

    return jsonRes;
  }

  async postAuthFormData() : Promise<any>{
    loadSecrets();
    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Authorization': `${TOKEN}`
      },
      body: this.payload
    });
    const jsonRes = await res.json();

    return jsonRes;
  }

  async get() : Promise<any>{
    loadSecrets();
    const res = await fetch(this.url, {
      method: 'GET',
      headers: {
        'Authorization': `${TOKEN}`
      },
    });
    const jsonRes = await res.json();

    return jsonRes;
  }
}