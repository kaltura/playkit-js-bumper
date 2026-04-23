// @flow
import {RequestBuilder} from '@playkit-js/playkit-js-providers/ovp-provider';
import {ILoader} from '@playkit-js/playkit-js-providers/ovp-provider';

interface FlavorUrlLoaderParams {
  flavorAsset: any;
}

type FlavorUrlResponse = {
  url: string
};

export class FlavorUrlLoader implements ILoader {
  _flavorAsset: any;
  _requests: RequestBuilder[] = [];
  _response: FlavorUrlResponse = {
    url: ''
  };

  static get id(): string {
    return 'flavorUrl';
  }

  constructor({flavorAsset}: FlavorUrlLoaderParams) {
    this._flavorAsset = flavorAsset;
    const headers: Map<string, string> = new Map();

    const request = new RequestBuilder(headers);
    request.service = 'flavorasset';
    request.action = 'getUrl';
    request.params = {
      id: this._flavorAsset.id
    };
    this._requests.push(request);
  }

  set requests(requests: any[]) {
    this._requests = requests;
  }

  get requests(): any[] {
    return this._requests;
  }

  set response(response: any) {
    this._response.url = response[0]?.data || '';
  }

  get response(): any {
    return this._response;
  }

  isValid(): boolean {
    return true;
  }
}
