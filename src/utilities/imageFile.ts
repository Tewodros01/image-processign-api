import { promises as fsPromises } from 'fs'; // Node's File System module

// Sharp module
import sharp from 'sharp';

// asynchronous function to check if file exists
const checkFileExists = async (fileResourceName: string): Promise<boolean> => {
  try {
    const fileVar = await fsPromises.open(fileResourceName, 'r');
    fileVar.close();
    return true;
  } catch (err) {
    return false;
  }
};

// asynchronous function that insists existence of specified directory
const insistDirectoryExists = async (
  directoryResourceName: string
): Promise<void> => {
  try {
    await fsPromises.readdir(directoryResourceName);
  } catch {
    await fsPromises.mkdir(directoryResourceName);
  }
  return Promise.resolve();
};

// asynchronous function to resize image file to specified dimensions and save as thumbnail
const resizeFile = async (
  inputFileName: string,
  width: number,
  height: number,
  outputFileName: string
): Promise<string> => {
  // check if output file already exists
  const outputFileExists = await checkFileExists(outputFileName);
  if (!outputFileExists) {
    // use Sharp module to create output file
    console.log('creating output file');
    await sharp(inputFileName).resize(width, height).toFile(outputFileName);
    return outputFileName;
  } else {
    console.log('existing output file');
    return outputFileName;
  }
};

export { checkFileExists, insistDirectoryExists, resizeFile };
