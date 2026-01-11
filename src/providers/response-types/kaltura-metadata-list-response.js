// @flow
import {providers} from '@playkit-js/kaltura-player-js';
import {KalturaMetadata} from './kaltura-metadata';
const {BaseServiceResult} = providers.ResponseTypes;

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
