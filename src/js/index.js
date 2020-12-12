import Html5Qrcode from './html5-qrcode/html5-qrcode';
import Html5QrcodeScanner from './html5-qrcode/html5-qrcode-scanner';

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

        this.init();

        this.makeRequest();
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
            this.html5QrCode.start(this.options.cameraSettings, this.options.cameraConfig, this.qrCodeSuccessCallback, this.qrCodeErrorCallback);
        })

        this.options.$stopBtn.addEventListener('click', (e) => this.stop(e) );
    }

    qrCodeSuccessCallback(message) { 
        let output = `we found your code ${message}`;
        this.options.$output.innerHTML = output;
        alert(output);
    }

    qrCodeErrorCallback(message) { 
        console.log(message);
    }

    stop(e){
        this.html5QrCode.stop().then(ignore => {
            alert('Scanning stopped')
        }).catch(err => {
            alert('Error when stopping')
        });
    }

    makeRequest(){
        fetch('https://7dwxc.sse.codesandbox.io/qr-scanner', {
            method: 'post',
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
        });
    }
}

const app = new App();
