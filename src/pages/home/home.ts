import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ContactPage } from '../contact/contact';
import { FiltrousuarioPage } from '../filtrousuario/filtrousuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarios = [];

  constructor(public navCtrl: NavController, 
    public usuarioProvider: UsuarioProvider,
    public modalCtrl: ModalController) 
    {
      this.carregaLista();
  }

  inserirUsuario(){
    this.navCtrl.push(ContactPage)
  }

  editItem(item) {
    const usuarioID = item.key;
    const usuario = item.value;

    this.navCtrl.push(ContactPage, {itemID: usuarioID, item: usuario});

  }

  openFilter() {

    const modal = this.modalCtrl.create(FiltrousuarioPage);

    modal.onDidDismiss(_params => {
  
      //console.log('chegou params',_params);

      if(_params !== undefined){

        if(_params.isLimpar) {
          console.log('isLimpar');
          this.carregaLista();

        }else {
          
          let usuario = _params.usuario;
          console.log('usuario',usuario);
    
          this.usuarioProvider.buscarFS(usuario).subscribe(_data =>{
            console.log('buscar',_data);
    
            this.usuarios = _data;
            
          }); 
        } 
      }
    });

    modal.present();

    
  }

  carregaLista(){
    this.usuarioProvider.listarFS().subscribe(_data =>{
      console.log(_data);

      this.usuarios = _data;
    })
  }

}
