import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';

var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const ddbClient = new AWS.DynamoDB.DocumentClient();

//var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
@Injectable()
export class UsuarioRepository {
  //private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: CriaUsuarioDTO) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(usuario.senha, salt);

    var params = {
      TableName: 'TableTest',
      Item: {
        id: 'user',
        sk: usuario.email,
        username: usuario.nome,
        passwd: hash,
      },
    };

    ddbClient.put(params, function (err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    });
  }

  async existeComEmail(email: string) {
    let params = {
      TableName: 'TableTest',
      KeyConditionExpression: 'id = :p and sk = :email',
      ExpressionAttributeValues: {
        ':p': 'user',
        ':email': email,
      },
      ProjectionExpression: 'sk, nome',
    };
    const result = await ddbClient.query(params).promise();
    console.log(result);

    return result.Count > 0; //se email for diferente de undefined ele retorna true(existe), se for undefined ele retorna false(não existe)
  }

  async listar() {
    let params = {
      TableName: 'TableTest',
      KeyConditionExpression: 'id = :p',
      ExpressionAttributeValues: {
        ':p': 'user',
      },
      ProjectionExpression: 'sk, username',
    };
    return await ddbClient.query(params).promise();
  }

  async buscaPorId(email: string) {
    let params = {
      TableName: 'TableTest',
      KeyConditionExpression: 'id = :p and sk = :email',
      ExpressionAttributeValues: {
        ':p': 'user',
        ':email': email,
      },
      ProjectionExpression: 'sk, username',
    };
    const result = await ddbClient.query(params).promise();

    if (!result.Items) {
      throw new Error('Usuario não existe');
    }

    return result.Items[0];
  }

  async atualiza(email: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(email);
    if (usuario) {
      let params = {
        TableName: 'TableTest',
        Key: {
          id: 'user',
          sk: email,
        },
        UpdateExpression: 'SET passwd = :p, username = :username',
        ConditionExpression: 'attribute_exists(sk)',
        ExpressionAttributeValues: {
          ':username': dadosDeAtualizacao.nome,
          ':p': dadosDeAtualizacao.senha,
        },
        //ProjectionExpression: 'sk, user',
      };

      const result = ddbClient.update(params, function (err, data) {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('Success', data);
        }
      });

      return result;
    } else {
      throw new Error('Usuario não existe');
    }
  }

  async remove(email: string) {
    const usuario = this.buscaPorId(email);
    console.log(usuario);

    if (usuario) {
      let params = {
        TableName: 'TableTest',
        Key: {
          id: 'user',
          sk: email,
        },
      };

      const delecao = ddbClient.delete(params).promise();
      return delecao;
    } else {
      throw new Error('Usuario não existe');
    }
  }
}
