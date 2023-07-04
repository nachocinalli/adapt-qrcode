import ComponentView from 'core/js/views/componentView';

class QRCodeView extends ComponentView {
  postRender() {
    this.setReadyStatus();
    this.setupInviewCompletion('.component__widget');
  }
}

QRCodeView.template = 'qrcode.jsx';

export default QRCodeView;
