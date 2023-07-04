import React, { useEffect, useState } from 'react';
import Adapt from 'core/js/adapt';
import { templates } from 'core/js/reactHelpers';
import 'libraries/qrcode';

export default function QRcode(props) {
  const { _id, size, margin, color, alt, longdescription } = props;

  const [_qrCodeGraphic, setQRCodeGraphic] = useState({});

  const getQRCodeText = () => {
    let text = props.text;
    if (props._isResourceItem) {
      const _resources = Adapt.course.get('_resources');
      if (_resources && _resources._isEnabled && _resources._resourcesItems.length > 0) {
        const resourceItemIndex = props._resourceItemIndex;

        const normalizeResourceItemIndex = resourceItemIndex > 0 && resourceItemIndex < _resources._resourcesItems.length ? resourceItemIndex : 0;

        const _resourceItem = _resources._resourcesItems[normalizeResourceItemIndex];

        const link = _resourceItem._link;
        if (!link) return text;

        if (link.startsWith('http')) {
          text = link;
        } else {
          text = window.location.origin + link;
        }
      }
    }

    return text;
  };
  useEffect(() => {
    const text = getQRCodeText();
    if (!text) return;
    // eslint-disable-next-line no-undef
    QRCode.toDataURL(text, {
      margin,
      color: { dark: color.dark, light: color.light }
    })
      .then((data) => {
        const qrCodeGraphic = {
          _src: data,
          alt,
          longdescription
        };
        setQRCodeGraphic(qrCodeGraphic);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className='component__inner qrcode__inner'>
      <templates.header {...props} />
      <div className='component__widget qrcode__widget'>
        <div className='qrcode__graphic' style={{ width: size, minHeight: size }}>
          <templates.image
            {..._qrCodeGraphic}
            longDescriptionId={`qrcode__graphic__longdescription__${_id}`}
            classNamePrefixes={['component', 'qrcode__graphic']}
          />
        </div>
        {_qrCodeGraphic.longdescription && (
          <div id={`qrcode__graphic__longdescription__${_id}`} className='qrcode__graphic__longdescription'>
            <div className='qrcode__graphic__longdescription-inner'>{_qrCodeGraphic.longdescription}</div>
          </div>
        )}
      </div>
    </div>
  );
}
