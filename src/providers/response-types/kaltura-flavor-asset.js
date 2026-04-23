// @flow
import {ResponseTypes} from '@playkit-js/playkit-js-providers/ovp-provider';

const {BaseServiceResult} = ResponseTypes;

export class KalturaFlavorAsset extends BaseServiceResult {
  id: string;
  entryId: string;
  status: string;
  bitrate: ?number;
  url: ?string;

  constructor(responseObj: any) {
    super(responseObj);
    if (!this.hasError && responseObj) {
      this.id = responseObj.id;
      this.entryId = responseObj.entryId;
      this.status = responseObj.status;
      this.bitrate = responseObj.bitrate;
    }
  }
}
