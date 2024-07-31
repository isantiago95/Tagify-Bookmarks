import iconFilled from '../../../assets/images/star-filled.png';
import iconEmpty from '../../../assets/images/start.png';

export const setIcon = (string: 'filled' | 'empty') => {
  const image = new Image();
  image.src = string === 'filled' ? iconFilled : iconEmpty;
  image.onload = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, image.width, image.height);
      chrome.action.setIcon({
        imageData,
      });
    }
  };
};
