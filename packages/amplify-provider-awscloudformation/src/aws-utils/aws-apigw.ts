import { $TSContext } from 'amplify-cli-core';
import aws from './aws.js';
import { APIGateway as APIGW } from 'aws-sdk';
import configurationManager from '../configuration-manager';

export class APIGateway {
  private static instance: APIGateway;
  private readonly context: $TSContext;
  public readonly apigw: APIGW;

  static async getInstance(context: $TSContext, options = {}): Promise<APIGateway> {
    if (!APIGateway.instance) {
      let cred = {};
      try {
        cred = await configurationManager.loadConfiguration(context);
      } catch (e) {
        // ignore missing config
      }

      APIGateway.instance = new APIGateway(context, cred, options);
    }
    return APIGateway.instance;
  }

  constructor(context: $TSContext, creds, options = {}) {
    this.context = context;
    this.apigw = new aws.APIGateway({ ...creds, ...options });
  }
}
