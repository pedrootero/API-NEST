import { Injectable } from '@nestjs/common';
import { empty } from 'rxjs';
import { UsuarioEntity } from './usuario.entity';

var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const ddbClient = new AWS.DynamoDB.DocumentClient();

//var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    //this.usuarios.push(usuario);

    var params = {
      TableName: 'TableTest',
      Item: {
        id: 'user',
        sk: usuario.email,
        user: usuario.nome,
        passwd: usuario.senha,
      },
    };

    ddbClient.putItem(params, function (err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    });
  }

  async existeComEmail(email: string) {
    /* const possivelUsuario = ddbClient.find(
      (usuario) => usuario.email === email,
    ); */

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

    return result.Items !== undefined; //se email for diferente de undefined ele retorna true(existe), se for undefined ele retorna false(não existe)
  }

  async listar() {
    let params = {
      TableName: 'TableTest',
      KeyConditionExpression: 'id = :p',
      ExpressionAttributeValues: {
        ':p': 'user',
      },
      ProjectionExpression: 'sk, nome',
    };
    const result = await ddbClient.query(params).promise();
  }

  async buscaPorId(email: string) {
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

    if (!result.Items) {
      throw new Error('Usuario não existe');
    }

    return result.Items;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      usuario[chave] = valor;
    });

    return usuario;
  }

  async remove(id: string) {
    console.log('chegou aqui 1');
    const usuario = this.buscaPorId(id);
    console.log(usuario);

    // this.usuarios = this.usuarios.indexOf(id);
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id,
    );
    console.log('chegou aqui');
    return usuario;
  }
}
