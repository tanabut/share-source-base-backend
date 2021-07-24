import path from 'path';
import fs from 'fs';

import { TEMP_DIRECTORY_PATH } from '../config';

export function getTempDirectoryPath() {
  const tempDownloadDirectory = path.resolve(TEMP_DIRECTORY_PATH);
  if (!fs.existsSync(tempDownloadDirectory)) {
    fs.mkdirSync(tempDownloadDirectory);
  }

  return tempDownloadDirectory;
}
