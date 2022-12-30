import express from 'express'; // Express server module

import path from 'path'; // Path module

// Image file utilities module
import {
  checkFileExists,
  insistDirectoryExists,
  resizeFile,
} from '../../utilities/imageFile';

// create the Router object
const images = express.Router();

// define the image resize route
// e.g. http://localhost:3000/image?f=imageName&x=jpeg&w=100&h=100
images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename = req.query.f as string;
    const extension = req.query.x as string;
    const width = req.query.w as string;
    const height = req.query.h as string;

    // check for valid request query parameters
    // if any one of these are not provided, image processor cannot proceed
    if (
      filename === undefined ||
      extension === undefined ||
      width === undefined ||
      height === undefined
    ) {
      // invalid request query parameters
      res.status(400).send('Missing request query parameters');
    } else {
      // check for valid width and height values
      const w = parseInt(width) as number;
      const h = parseInt(height) as number;
      if (isNaN(w) || isNaN(h)) {
        res.status(400).send('Invalid request query parameters');
      } else {
        // pass the file extension as a request query parameter
        const extensionLowercase = extension.toLowerCase();
        const assetResourceName =
          path.join(__dirname, '../../../assets/full/') +
          filename +
          '.' +
          extensionLowercase;
        const thumbnailDirectory = path.join(
          __dirname,
          '../../../assets/thumbnail/'
        );
        const thumbnailResourceName =
          thumbnailDirectory +
          filename +
          '-' +
          width +
          'w-' +
          height +
          'h.' +
          extensionLowercase;

        // check if specified file exists in assets
        const assetExists = await checkFileExists(assetResourceName);
        if (assetExists) {
          // check if thumbnail directory exists; create if it doesn't
          insistDirectoryExists(thumbnailDirectory);

          // resize asset image to specified dimensions and save as thumbnail
          resizeFile(
            assetResourceName,
            parseInt(width),
            parseInt(height),
            thumbnailResourceName
          ).then((outputFileName) => {
            console.log('file returned: ' + outputFileName);
            res.status(200).sendFile(outputFileName);
          });
        } else {
          // unknown filename resource
          res.status(404).send('Cannot find the requested resource');
        }
      }
    }
  }
);

// export the routes object
export default images;
