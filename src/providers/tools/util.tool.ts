import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Injectable } from "@angular/core";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";

declare var $: any;

@Injectable()
export class UtilProvider {
  constructor(private toastCtrl: ToastController, private loadingController: LoadingController, private alertController: AlertController) {

  }

  async AlertToast(msg: string, duration: number = 2000) {
    let toast = this.toastCtrl.create(
      {
        cssClass: `toast-message`,
        message: msg,
        duration: duration,
        position: "bottom"
      });

    (await toast).present();
  }

  async ToastError(msg: string, duration: number = 2000) {
    let toast = this.toastCtrl.create(
      {
        cssClass: `toast-error`,
        message: msg,
        duration: duration,
        position: "bottom"
      });

    (await toast).present();
  }

  async CriarLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      message: 'Aguarde'
    });

    await loading.present();

    return loading;
  }

  // async CriarAlert(titulo: string, subtitulo: string, mensagem: string) {
  //   let alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Alert',
  //     subHeader: 'Subtitle',
  //     message: 'This is an alert message.',
  //     buttons: ['OK']
  //   });

  //   await alert.present();

  //   const { role } = await alert.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }

  PadLeft(texto: string, maximo: number, textoComplemento: string) {
    if (texto == null)
      return null;

    texto = texto.toString();
    return texto.length < maximo ? this.PadLeft(textoComplemento + texto, maximo, textoComplemento) : texto;
  }


  PadRight(texto: string, maximo: number, textoComplemento: string) {
    texto = texto.toString();
    return texto.length < maximo ? this.PadRight(texto + textoComplemento, maximo, textoComplemento) : texto;
  }

  async DismissLoading(loader: HTMLIonLoadingElement): Promise<boolean> {
    return loader.dismiss();
  }
}
