import Html5Qrcode from './html5-qrcode/html5-qrcode';
import Html5QrcodeScanner from './html5-qrcode/html5-qrcode-scanner';

class App{

    constructor(){
        this.html5QrCode = new Html5Qrcode("reader");

        this.options = {
            $scanBtn: document.querySelector('.js-scan'),
            cameraSettings: { 
                facingMode: "environment" 
            },
            cameraConfig: { 
                fps: 10, 
                qrbox: 250 
            }
        }
    }

    init(){
        this.initEvents();
    }

    initEvents(){
        this.options.$scanBtn.addEventListener('click', () => {
            this.html5QrCode.start(this.options.cameraSettings, this.options.config, this.qrCodeSuccessCallback);
        })
    }

    qrCodeSuccessCallback() { 
        console.log(message);
    }
}

const app = new App();
