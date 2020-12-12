import '../scss/master.scss';

import Html5Qrcode from './html5-qrcode/html5-qrcode';
import Html5QrcodeScanner from './html5-qrcode/html5-qrcode-scanner';
import './install';

class App{

    constructor(){
        this.html5QrCode = new Html5Qrcode("reader");

        this.options = {
            $scanBtn: document.querySelector('.js-scan'),
            $stopBtn: document.querySelector('.js-scan-stop'),
            $select: document.querySelector('.js-cameras'),
            $output: document.querySelector('.js-output'),
            cameraSettings: { 
                facingMode: "environment" 
            },
            cameraConfig: { 
                fps: 10, 
                qrbox: 250 
            }
        }

        console.log(this.options);

        this.init();
    }

    init(){
        this.getCameras();
        this.initEvents();
    }

    /**
     * This method will trigger user permissions
     * 
     * devices would be an array of objects of type:
     * { id: "id", label: "label" }
     */
    getCameras(){
        Html5Qrcode.getCameras().then(devices => {
            console.log(devices);
            if (devices && devices.length) {
                devices.forEach(device => {
                    let option = document.createElement("option");
                    option.text = device.label;
                    option.value = device.id;
                    this.options.$select.appendChild(option);
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    initEvents(){
        this.options.$scanBtn.addEventListener('click', (e) => {
            console.log('click');
            this.html5QrCode.start(this.options.cameraSettings, this.options.cameraConfig, 
                (messsage) => this.qrCodeSuccessCallback(messsage), 
                this.qrCodeErrorCallback
            );
        })

        this.options.$stopBtn.addEventListener('click', (e) => this.stop(e) );
    }

    qrCodeSuccessCallback(message) { 
        let output = `<p>We found your code ${message}</p>`;
        this.options.$output.innerHTML = output;
        this.makeRequest(message);
    }

    qrCodeErrorCallback(message) { 
      //  console.log(message);
    }

    stop(e){
        this.html5QrCode.stop().then(ignore => {
            alert('Scanning stopped')
        }).catch(err => {
            alert('Error when stopping')
        });
    }

    makeRequest(url){
        fetch(url, {
            method: 'post',
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data.msg);
            this.options.$output.innerHTML = this.options.$output.innerHTML + '<p>Response data: '+ data.msg +'</p>';

        });
    }
}

const app = new App();
