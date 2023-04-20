import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../model/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  titulo = '';

  itemID = undefined;
  item = new Usuario();

  usuarios = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioProvider: UsuarioProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    
    ) {

      const itemID = this.navParams.get('itemID');
      const item = this.navParams.get('item');

      console.log(itemID)
      console.log(item)

      if(itemID) { //se tem itemID
        this.itemID = itemID;
        this.item = item;

        this.titulo = 'Atualizar usuario';

      } else {
        this.itemID = undefined;
        this.item = new Usuario();

        this.titulo = 'Inserir usuario';
      }

  }

  ionViewDidLoad() {
    
  }

  salvar() {

    console.log(this.item);

    this.item.lat = parseFloat(this.item.lat + '');
    this.item.lng = parseFloat(this.item.lng + '');

    

    if(this.itemID) { //atualizar

      ///this.itemProvider.atualizar(this.itemID, this.item)
      //.then(_ => {

        //this.showAlert('Cadastro atualizado com sucesso!');
        
      //})

      this.usuarioProvider.atualizarFS(this.itemID, this.item)
      .then(_ => {

        this.showAlert('Cadastro atualizado com sucesso!');
        
      })

    } else { //inserir

      //this.itemProvider.inserir(this.item);

      this.usuarioProvider.inserirFS(this.item);

      this.showAlert('Cadastro inserido com sucesso!');

    };


  }

  excluir() {

    const confirm = this.alertCtrl.create({
      title: 'Excluir formulário?',
      message: 'Tem certeza da exclusão do formulário?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {

            //this.itemProvider.remover(this.itemID)
            //.then(_ => {
              //this.showAlert('Cadastro excluído com sucesso!');
            //})
            //.catch(error => {
              //console.log('error', error);
            //})    
            this.usuarioProvider.removerFS(this.itemID)
            .then(_ => {
              this.showAlert('Cadastro excluído com sucesso!');
            })
            .catch(error => {
              console.log('error', error);
            })
          }
        }
      ]
    });
    confirm.present();
    
  }

  showAlert(mensagem) {
    const alert = this.alertCtrl.create({
        title: mensagem,
        subTitle: '',
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }


}
