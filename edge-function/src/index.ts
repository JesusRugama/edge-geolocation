import { CloudFrontResponseEvent, CloudFrontResponseHandler, CloudFrontResponseResult } from 'aws-lambda';

export const handler: CloudFrontResponseHandler = async (
  event: CloudFrontResponseEvent
): Promise<CloudFrontResponseResult> => {
  const request = event.Records[0].cf.request;
  const response = event.Records[0].cf.response;

  const edgeLocation = event.Records[0].cf.config.distributionDomainName 
    ? event.Records[0].cf.config.requestId.split('-')[0] 
    : '';

  const geoHeaders: Record<string, string> = {
    'x-geo-country': request.headers['cloudfront-viewer-country']?.[0]?.value || '',
    'x-geo-country-name': request.headers['cloudfront-viewer-country-name']?.[0]?.value || '',
    'x-geo-region': request.headers['cloudfront-viewer-country-region']?.[0]?.value || '',
    'x-geo-region-name': request.headers['cloudfront-viewer-country-region-name']?.[0]?.value || '',
    'x-geo-city': request.headers['cloudfront-viewer-city']?.[0]?.value || '',
    'x-geo-postal-code': request.headers['cloudfront-viewer-postal-code']?.[0]?.value || '',
    'x-geo-latitude': request.headers['cloudfront-viewer-latitude']?.[0]?.value || '',
    'x-geo-longitude': request.headers['cloudfront-viewer-longitude']?.[0]?.value || '',
    'x-geo-time-zone': request.headers['cloudfront-viewer-time-zone']?.[0]?.value || '',
    'x-edge-location': response.headers['x-amz-cf-pop']?.[0]?.value || '',
  };

  const exposedHeaders: string[] = [];
  
  for (const [key, value] of Object.entries(geoHeaders)) {
    if (value) {
      response.headers[key] = [{ key, value }];
      exposedHeaders.push(key);
    }
  }

  if (exposedHeaders.length > 0) {
    response.headers['access-control-expose-headers'] = [
      { key: 'Access-Control-Expose-Headers', value: exposedHeaders.join(', ') }
    ];
  }

  return response;
};
