import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from '../../model/usuario';


@Injectable()
export class UsuarioProvider {

  ENTIDADE = '/usuarios';

  constructor(public http: HttpClient,
    public afd: AngularFireDatabase,
    public afs: AngularFirestore
    ) {
    console.log('Hello UsuarioProvider Provider');
  }

  listar(){ //realtime_db
    //return this.afd.list('/usuarios').valueChanges();
    return this.afd.list(this.ENTIDADE)
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val()})));

  }

  listarFS(){ //firestore_db
    //return this.afs.collection(this.ENTIDADE).valueChanges();
    return this.afs.collection(this.ENTIDADE)
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.doc.id, value: changes.payload.doc.data()})))
  }

  buscar(usuario: any){ //realtime_db
    usuario = usuario ?
    usuario.toString(): usuario;
    //return this.afd.list('/usuarios').valueChanges();
    return this.afd.list(this.ENTIDADE, ref => ref.orderByChild('usuario').equalTo(usuario))
    .snapshotChanges()
    .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val()})));

  }

  buscarFS(usuario: any){ //firestore_db

    usuario = usuario ?
    usuario.toString(): usuario;
    
    return this.afs.collection(this.ENTIDADE, 
      ref => ref

        .where('usuario', '==', usuario)
        .orderBy('nome')
    )
    .snapshotChanges()
    .map(item => item.map(changes => ({key: changes.payload.doc.id, value: changes.payload.doc.data()})));

}

  inserir(usuario){ //realtime_db
    return this.afd.list(this.ENTIDADE).push(usuario);
  }

  inserirFS(usuario: Usuario) { //firestore_db
    //const obj = {
      //nome: usuario.nome,
      //endereco: usuario.endereco,
      //bairro: usuario.bairro,
      //cidade: usuario.cidade,
      //crm: usuario.crm,
      //especialidade: usuario.especialidade,
      //contato: usuario.contato,

    //}

    // converte a entidade usuario para obj json generico
    const obj = JSON.parse( JSON.stringify(usuario));

    const id = this.afs.createId();
    return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
  }

  atualizar(id, usuario) { //realtime_db

    return this.afd.object(this.ENTIDADE + '/' + id).update(usuario);

  }

  atualizarFS(id, usuario){ //firestore_db
    return this.afs.doc(this.ENTIDADE + '/' + id).update(usuario);
  }

  remover(id){ //realtime_db

    return this.afd.object(this.ENTIDADE + id).remove();

  }

  removerFS(id){ //firestore_db
    return this.afs.doc(this.ENTIDADE + '/' + id).delete();

  }

}
