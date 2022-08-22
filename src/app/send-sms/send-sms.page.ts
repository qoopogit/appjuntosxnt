import { Component, OnInit } from '@angular/core';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
//import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from './../api/db.service';
import { Contacto } from './../api/contacto';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
//import { Service } from '../api/Service';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.page.html',
  styleUrls: ['./send-sms.page.scss'],
})
export class SendSmsPage implements OnInit {
  //public contactos: Contacto[] = [];
  Data: any[] = [];
  public contactoSelecionado: Contacto;
  public smsSeleccionado: string;
  public smsActivo = true;
  public smsMensajes = [];
  latitud: number;
  longitud: number;

  constructor(
    private db: DbService,
    //public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private sms: SMS,
    private geolocation: Geolocation
  ) {
    //this.db.loadContactos();
    //this.contactos = this.db.getData();
    //console.log('Contactos lista=>');
    //console.log(this.contactos);
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitud = resp.coords.latitude;
        this.longitud = resp.coords.longitude;
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  ngOnInit() {
    this.db.fetchContactos().subscribe((item) => {
      console.log('Ejecutando el fetch que actualiza la data...');
      this.Data = item;
    });
  }

  private toastMensaje(mensaje: string) {
    let toast = this.toast.create({
      message: mensaje,
      duration: 2500,
    });
    toast.then((resp) => {
      resp.present();
    });
  }

  async sendSms() {
    // Send a text message using default options
    var numero = this.contactoSelecionado.number;
    var mensaje = this.contactoSelecionado.sms.trim().toString();
    mensaje = `${this.contactoSelecionado.sms.toString()}, Mi ubicación actual es: https://www.google.com/maps/dir/?api=1&destination=${this.latitud.toString()},${this.longitud.toString()}&zoom=20`;

    var error = function (e) {
      alert('Something went wrong:' + e);
    };


    let options = {
      eplaceLineBreaks: true, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT', // send SMS with the native android SMS messaging
        //intent: '' // send SMS without open any other app
      },
    };

    this.sms
      .send(numero, mensaje, options)
      .then((resp) => {
        this.toastMensaje('Mensaje enviado');
      })
      .catch((e) => {
        console.log('Error el enviar sms');
        this.toastMensaje('Error al enviar el sms');
      });
  }

  onChangeContacto(contacto: Contacto) {
    if (this.contactoSelecionado.sms !== null) {
      this.smsMensajes = [
        'Llamame urgente',
        'Ven a verme urgente',
        'Llama al 911 en mi nombre urgente',
        this.contactoSelecionado.sms,
      ];
    } else {
      this.smsMensajes = [
        'Llamame urgente',
        'Ven a verme urgente',
        'Llama al 911 en mi nombre urgente',
      ];
    }
    this.smsActivo = false;
    //this.contactoSelecionado = contacto;
  }

  onChangeSms(sms: string) {
    this.contactoSelecionado.sms = this.smsSeleccionado;
  }
}
