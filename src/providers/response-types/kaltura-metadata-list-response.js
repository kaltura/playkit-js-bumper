// @flow
import {ResponseTypes} from '@playkit-js/playkit-js-providers/ovp-provider';
const {BaseServiceResult} = ResponseTypes;

import {KalturaMetadata} from './kaltura-metadata';

export class KalturaMetadataListResponse extends BaseServiceResult {
  totalCount: number;
  data: KalturaMetadata | null = null;

  constructor(responseObj: any) {
    super(responseObj);
    if (!this.hasError) {
      this.totalCount = responseObj.totalCount;
      if (this.totalCount === 1) {
        this.data = new KalturaMetadata(responseObj.objects[0]);
      }
    }
  }
}
