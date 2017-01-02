'use strict';

import IndonFlag from '../Resources/flags/INA.gif';
import SingFlag from '../Resources/flags/SIN.gif';
import MasFlag from '../Resources/flags/MAS.gif';
import ThaiFlag from '../Resources/flags/THA.gif';
import BruFlag from '../Resources/flags/BRU.gif';
import CamFlag from '../Resources/flags/CAM.gif';
import LaoFlag from '../Resources/flags/LAO.gif';
import MyaFlag from '../Resources/flags/MYA.gif';
import PhiFlag from '../Resources/flags/PHI.gif';
import VietFlag from '../Resources/flags/VIE.gif';

export default {
  getCountryFlag(countryCode) {
    let flagSrc;
    switch (countryCode) {
      case 'SIN':
          flagSrc = SingFlag;
        break;
      case 'INA':
          flagSrc = IndonFlag;
        break;
      case 'THA':
          flagSrc = ThaiFlag;
        break;
      case 'MAS':
          flagSrc = MasFlag;
        break;
      case 'VIE':
          flagSrc = VietFlag;
        break;
      case 'BRU':
          flagSrc = BruFlag;
        break;
      case 'CAM':
          flagSrc = CamFlag;
        break;
      case 'LAO':
          flagSrc = LaoFlag;
        break;
      case 'MYA':
          flagSrc = MyaFlag;
        break;
      case 'PHI':
          flagSrc = PhiFlag;
        break;
      default:
        flagSrc = MasFlag;
    }
    return flagSrc;
  }
};
