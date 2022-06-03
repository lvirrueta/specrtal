import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  public pendingLogins = 0;

  public MODALTYPE = {
    success: {
      icon: "success.png",
      color: "--color-success2",
      background: "background-color-success",
      buttonColor: "--color-success2",
    },
    warning: {
      icon: "warning.png",
      color: "--color-warning2",
      background: "background-color-warning",
      buttonColor: "--color-warning2",
    },
    danger: {
      icon: "error.png",
      color: "--color-danger2",
      background: "background-color-danger",
      buttonColor: "--color-danger2",
    },
    info: {
      icon: "info.png",
      color: "--color-info2",
      background: "background-color-info",
      buttonColor: "--color-info2",
    },
    main: {
      icon: "info.png",
      color: "--color-main3",
      background: "background-color-main",
      buttonColor: "--color-main3",
    },
  };

  constructor() { }

  public singleModal(
    text: string,
    confirmLabel: string,
    modalType: {
      icon: string;
      color: string;
      background: string;
      buttonColor: string;
    }
  ): Promise<SweetAlertResult<any>> {
    this.pendingLogins = 0;
    Swal.close();
    return Swal.fire({
      html: `
        <!-- Contenedor del html para la modal -->
        <div class="container-fluid px-0"
             style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 7.5rem;
              margin-left: auto;
              margin-right: auto;
               
             ">

          <!-- Encabezado -->
          <div class="row g-0"
               style="
                padding-top: 1.25rem;
                padding-bottom: 1.25rem;
                border-top: 15px solid  var(${modalType.color});
                border-radius: 20px 20px 0px 0px;
               ">

          </div>
          <!-- FIN Encabezado -->


          <!-- Cuerpo de la modal -->
            <div class="row g-0"
                 style="
                  margin-top: 1.5rem;
                 ">
              <div class="col-12 text-center">


              <!-- Icono -->
               <div class="col-12 p-0">
               <img src="/assets/img/shared/modals/${modalType.icon}" alt="icon"/>
                 
               </div>
              <!-- FIN Icono -->

                <br/>
                <div class="px-3">
                <b class="roboto-font-3 font-color-black pt-5" 
                style="
                     padding-top: 10px;
                    ">${text}</b>
                </div>
              </div>
            </div>
          <!-- FIN Cuerpo de la modal -->


        </div>
        <!-- FIN Contenedor del html para la modal -->

        <!-- Separador -->
        <div style="margin-top: 11rem"></div>
        <!-- FIN Separador -->
      `,
      customClass: {
        popup: 'swal-popup-general',
        confirmButton: 'btn-widht',
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      reverseButtons: true,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,
      confirmButtonText: `<span class="roboto-font-5">${confirmLabel}</span>`,
      // ConfirmButtonColor: this.scssConectionService.getColorFromStyles(modalType.buttonColor),
    });
  }

  // Modal with two buttons
  public questionModal(
    text: string,
    confirmLabel: string,
    cancelLabel: string,
    modalType: {
      icon: string;
      color: string;
      background: string;
      buttonColor: string;
    }
  ): Promise<SweetAlertResult<any>> {
    this.pendingLogins = 0;
    Swal.close();
    return Swal.fire({
      html: `
        <!-- Contenedor del html para la modal -->
        <div class="container-fluid px-0"
             style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 7.5rem;
              margin-left: auto;
              margin-right: auto;
              border-top: 15px solid  var(${modalType.color});
              border-radius: 20px 20px 0px 0px;
             ">

          <!-- Encabezado -->
          <div class="row g-0"
               style="
                padding-top: 1.25rem;
                padding-bottom: 1.25rem;
                border-radius: 4px 4px 0px 0px;
               ">

          </div>
          <!-- FIN Encabezado -->


          <!-- Cuerpo de la modal -->
            <div class="row g-0"
                 style="
                  margin-top: 1.5rem;
                 ">
              <div class="col-12 text-center">
                <!-- Icono -->
                 <div class="col-12 p-0">
                 <img src="/assets/img/shared/modals/${modalType.icon}" alt="icon"/>
                   
                 </div>
                <!-- FIN Icono -->
                <br/>
                <div class="px-3">
                <b class="roboto-font-3 font-color-info"
                style="
                     padding-top: 10px;
                    ">${text}</b>
                    </div>
              </div>
            </div>
          <!-- FIN Cuerpo de la modal -->


        </div>
        <!-- FIN Contenedor del html para la modal -->

        <!-- Separador -->
        <div style="margin-top: 11rem"></div>
        <!-- FIN Separador -->
      `,
      customClass: {
        popup: 'swal-popup-general',
        cancelButton: 'btn-widht',
        confirmButton: 'btn-widht',
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      reverseButtons: true,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: `
        <span class="roboto-font-5">${confirmLabel}</span>
      `,
      // ConfirmButtonColor: this.scssConectionService.getColorFromStyles(modalType.buttonColor),
      denyButtonText: `<span class="roboto-font-5">&nbsp;&nbsp;${cancelLabel}&nbsp;&nbsp;</span>`
    });
  }


  // Image modal
  public image(url: string): void {
    this.pendingLogins = 0;
    Swal.close();
    Swal.fire({
      html: `
        <!-- Contenedor del html para la modal -->
        <div class="container-fluid">


          <!-- Cuerpo de la modal -->
            <div class="row">
              <div class="col-12 p-0 text-center">
                <img src="${url}"
                     alt="image"
                     class="img-fluid">
              </div>
            </div>
          <!-- FIN Cuerpo de la modal -->


        </div>
        <!-- FIN Contenedor del html para la modal -->
      `,
      customClass: {
        popup: 'swal-popup-general'
      },
      allowOutsideClick: true,
      backdrop: true,
      allowEscapeKey: true,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
  }

  public modalWithInput(
    title: string,
    text: string,
    inputType:
      'text' | 'email' | 'password' | 'number' | 'tel' | 'range' |
      'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'url'
  ): Promise<SweetAlertResult<any>> {
    this.pendingLogins = 0;
    Swal.close();
    return  Swal.fire({
      customClass: {
        popup: `popup-class`,
        cancelButton: 'btn-cancel btn-widht',
        confirmButton: 'btn-acep btn-widht',
        validationMessage: 'validation-msg',
      },
      title: title,
      text: text,
      input: inputType,
      showCancelButton: true,
      // InputValidator: value => {
      //   If (!value) {
      //     Return inputAlerts.required;
      //   } else if(value.length > 18) {
      //     Return inputAlerts.max + 18;
      //   } 
      // },
      inputAttributes: {
        maxlength: '18',
        pattern: '/^[A-Za-z ]+$/',
        // eslint-disable-next-line max-len
        onkeypress: "return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||(event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 32))"
      }, 
    });
  }

  // Loading modal
  public loading(text: string): void {
    this.pendingLogins++;
    Swal.fire({
      html: `
        <!-- Contenedor del html para la modal -->
        <div class="container-fluid px-0"
             style="
              position: absolute;
              top: 0;
              left: 0;
              height: 7.5rem;
              margin-left: auto;
              margin-right: auto;
              border-radius: 4px 4px 0px 0px;
             ">

          <!-- Encabezado -->
          <div class="row g-0"
               style="
                padding-top: 1.25rem;
                padding-bottom: 1.25rem;
                border-top: 15px solid  var(${this.MODALTYPE.info.color});
                border-radius: 20px 20px 0px 0px;
               ">
               <!-- Icono -->
               <div class="col-12 p-0">
                 <i class="fas fa-info-circle font-color-info"
                    style="
                     font-size: 5rem;
                     line-height: 5.1rem;
                     color: white;
                    "></i>
               </div>
             <!-- FIN Icono -->
          </div>
          <!-- FIN Encabezado -->


          <!-- Cuerpo de la modal -->
            <div class="row g-0"
                 style="
                  margin-top: 1.5rem;
                 ">
              <div class="col-12 text-center">
                
              <div class="px-3">
                <b class="roboto-font-3 font-color-info mx-3"
                style="
                     padding-top: 10px;
                    ">${text}</b>
              </div>
              </div>
            </div>
          <!-- FIN Cuerpo de la modal -->


        </div>
        <!-- FIN Contenedor del html para la modal -->

        <!-- Separador -->
        <div style="margin-top: 11rem"></div>
        <!-- FIN Separador -->
      `,
      customClass: {
        popup: 'swal-popup-general',
        cancelButton: 'btn-widht',
        confirmButton: 'btn-widht',
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      // ConfirmButtonColor: this.scssConectionService.getColorFromStyles('--color-info2')
    });
    Swal.showLoading();
  }

  public close(): void {
    this.pendingLogins--;
    if (this.pendingLogins === 0) {
      Swal.close();
    } else if (this.pendingLogins < 0) {
      this.pendingLogins = 0;
      Swal.close();
    }
  }
}
