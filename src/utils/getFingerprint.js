import Fingerprint2 from 'fingerprintjs2';

export default function (cb) {
  (new Fingerprint2({
    excludeUserAgent: true,
    excludeColorDepth: true,
    excludeScreenResolution: true,
    excludeAvailableScreenResolution: true,
    excludeLanguage: true,
    excludeTimezoneOffset: true,
    excludeTimezone: true,
    excludeHasLiedResolution: true,
    excludeHasLiedLanguages: true,
    excludeHasLiedOs: true,
    excludeHasLiedBrowser: true,
  })).get(cb);
}
