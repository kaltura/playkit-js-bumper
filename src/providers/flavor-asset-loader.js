// @flow
import {RequestBuilder} from '@playkit-js/playkit-js-providers/ovp-provider';
import {ILoader} from '@playkit-js/playkit-js-providers/ovp-provider';
import {KalturaFlavorAssetListResponse} from './response-types/kaltura-flavor-asset-list-response';

interface FlavorAssetLoaderParams {
  entryId: string;
}

type FlavorAssetResponse = {
  flavorAsset: any
};

export class FlavorAssetLoader implements ILoader {
  _entryId: string;
  _requests: RequestBuilder[] = [];
  _response: FlavorAssetResponse = {
    flavorAsset: null
  };

  static get id(): string {
    return 'flavorList';
  }

  constructor({entryId}: FlavorAssetLoaderParams) {
    this._entryId = entryId;
    const headers: Map<string, string> = new Map();

    const flavorAssetListRequest = new RequestBuilder(headers);
    flavorAssetListRequest.service = 'flavorasset';
    flavorAssetListRequest.action = 'list';
    flavorAssetListRequest.params = {
      filter: {
        objectType: 'KalturaAssetFilter',
        entryIdEqual: this._entryId
      }
    };
    this._requests.push(flavorAssetListRequest);
  }

  set requests(requests: any[]) {
    this._requests = requests;
  }

  get requests(): any[] {
    return this._requests;
  }

  set response(response: any) {
    // Response is the flavor asset list
    if (response && response.length > 0) {
      const flavorAssetListResponse = new KalturaFlavorAssetListResponse(response[0]?.data);
      if (flavorAssetListResponse.data && flavorAssetListResponse.data.length > 0) {
        const highestBitrateAsset = flavorAssetListResponse.data.reduce((highest, asset) =>
          (asset.bitrate || 0) > (highest.bitrate || 0) ? asset : highest
        );
        this._response.flavorAsset = highestBitrateAsset;
      }
    }
  }

  get response(): any {
    return this._response;
  }

  isValid(): boolean {
    return Boolean(this._entryId);
  }
}
