// @flow
import {ResponseTypes} from '@playkit-js/playkit-js-providers/ovp-provider';
import {KalturaFlavorAsset} from './kaltura-flavor-asset';

const {BaseServiceResult} = ResponseTypes;

export class KalturaFlavorAssetListResponse extends BaseServiceResult {
  totalCount: number;
  data: KalturaFlavorAsset[] = [];

  constructor(responseObj: any) {
    super(responseObj);
    if (!this.hasError && responseObj) {
      this.totalCount = responseObj.totalCount || 0;
      if (responseObj.objects && Array.isArray(responseObj.objects)) {
        this.data = responseObj.objects.map((obj: any) => new KalturaFlavorAsset(obj));
      }
    }
  }
}
