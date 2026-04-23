// @flow
import {ResponseTypes} from '@playkit-js/playkit-js-providers/ovp-provider';

const {BaseServiceResult} = ResponseTypes;

export class KalturaFlavorAsset extends BaseServiceResult {
  id: string;
  entryId: string;
  status: string;
  width: ?number;
  height: ?number;
  bitrate: ?number;
  frameRate: ?number;
  isOriginal: boolean;
  createdAt: number;
  updatedAt: number;
  url: ?string;

  constructor(responseObj: any) {
    super(responseObj);
    if (!this.hasError && responseObj) {
      this.id = responseObj.id;
      this.entryId = responseObj.entryId;
      this.status = responseObj.status;
      this.width = responseObj.width;
      this.height = responseObj.height;
      this.bitrate = responseObj.bitrate;
      this.frameRate = responseObj.frameRate;
      this.isOriginal = responseObj.isOriginal;
      this.createdAt = responseObj.createdAt;
      this.updatedAt = responseObj.updatedAt;
    }
  }
}
