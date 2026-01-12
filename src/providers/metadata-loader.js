// @flow
import {RequestBuilder} from '@playkit-js/playkit-js-providers/ovp-provider';
import {KalturaMetadata} from './response-types/kaltura-metadata';
import {KalturaMetadataListResponse} from './response-types/kaltura-metadata-list-response';

interface ILoader {
  requests: Array<RequestBuilder>;
  response: any;
  isValid(): boolean;
}

interface MetadataLoaderParams {
  entryId: string;
  metadataProfileId: number;
}

type MetadataResponse = {
  metadata: KalturaMetadata | null
};

export class MetadataLoader implements ILoader {
  _entryId: string;
  _metadataProfileId: number;
  _requests: RequestBuilder[] = [];
  _response: MetadataResponse = {
    metadata: null
  };

  static get id(): string {
    return 'metadata';
  }

  constructor({entryId, metadataProfileId}: MetadataLoaderParams) {
    this._entryId = entryId;
    this._metadataProfileId = metadataProfileId;

    const headers: Map<string, string> = new Map();

    const metadataListRequest = new RequestBuilder(headers);
    metadataListRequest.service = 'metadata_metadata';
    metadataListRequest.action = 'list';
    metadataListRequest.params = {
      filter: {
        objectType: 'KalturaMetadataFilter',
        metadataProfileIdEqual: this._metadataProfileId,
        metadataObjectTypeEqual: 1,
        objectIdEqual: this._entryId
      }
    };
    this.requests.push(metadataListRequest);
  }

  set requests(requests: any[]) {
    this._requests = requests;
  }

  get requests(): any[] {
    return this._requests;
  }

  set response(response: any) {
    const metadataListRequestResponse = new KalturaMetadataListResponse(response[0]?.data);
    if (metadataListRequestResponse.totalCount) {
      this._response.metadata = metadataListRequestResponse?.data;
    }
  }

  get response(): any {
    return this._response;
  }

  isValid(): boolean {
    return Boolean(this._entryId) && Boolean(this._metadataProfileId);
  }
}
