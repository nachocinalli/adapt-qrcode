import components from 'core/js/components';
import QRCodeView from './QRCodeView';
import QRCodeModel from './QRCodeModel';

export default components.register('qrcode', {
  model: QRCodeModel,
  view: QRCodeView
});
