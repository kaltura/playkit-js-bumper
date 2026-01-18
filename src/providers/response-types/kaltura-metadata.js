// @flow
export interface KalturaMetadataArgs {
  xml: string;
}

export class KalturaMetadata {
  xml: string;

  constructor(metadata: KalturaMetadataArgs) {
    this.xml = metadata.xml;
  }
}
