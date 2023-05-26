import { Injectable } from '@nestjs/common';

var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const ddbClient = new AWS.DynamoDB.DocumentClient();

//var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
@Injectable()
export class ConvidadosRepository {
  constructor() {} // @Inject(forwardRef(() => AuthService))

  async salvar(nome, cel, evento) {
    console.log({ nome });
    console.log({ cel });
    console.log({ evento });
    try {
      var params = {
        TableName: 'TableTest',
        Item: {
          id: 'convidados',
          sk: nome,
          cel: cel,
          evento: evento,
        },
      };

      return await ddbClient.put(params).promise();
    } catch (error) {}
  }

  async listar() {
    let params = {
      TableName: 'TableTest',
      KeyConditionExpression: 'id = :p',
      ExpressionAttributeValues: {
        ':p': 'convidados',
      },
      ProjectionExpression: 'sk, cell',
    };
    return await ddbClient.query(params).promise();
  }
}
