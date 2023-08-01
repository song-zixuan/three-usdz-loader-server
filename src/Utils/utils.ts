import * as fs from 'fs';

export class USDZLoaderUtils {
  /**
   * Read a file async and returns an array buffer
   * @param file
   * @returns
   */
  public static readFileAsync(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  }
  /**
   * Function to convert a file to ArrayBuffer
   * @param filePath
   * @returns
   */
  public static readServerFileAsync(filePath: string): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const arrayBuffer = this.toArrayBuffer(data);
          resolve(arrayBuffer);
        }
      });
    });
  }
  /**
   * Helper function to convert a Buffer to ArrayBuffer
   * @param buffer
   * @returns
   */
  private static toArrayBuffer(buffer: Buffer): ArrayBuffer {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; i++) {
      view[i] = buffer[i];
    }
    return arrayBuffer;
  }
//   /**
//  * Read a file from server and returns an array buffer
//  * @param filePath
//  * @returns
//  */
//   async readServerFileAsync(filePath: string): Promise<string | ArrayBuffer | null> {
//     return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
//       // TODO: get file from server and convert it to an ArrayBuffer
//       const arrayBuffer = this.fileToArrayBuffer(filePath);

      




//       // const reader = new FileReader();

//       // reader.onload = () => {
//       //   resolve(reader.result);
//       // };

//       // reader.onerror = reject;

//       // reader.readAsArrayBuffer(file);
//     });
//   }

  /**
   * Generate random string GUID
   */
  public static getRandomGuid(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }

  /**
   * Given a file name / path, returns the file extension
   * @param filePath
   * @returns
   */
  public static getFileExtension(filePath: string): string {
    let extension = filePath.split('.').pop();
    if (extension == undefined) {
      throw 'Cannot determine extension';
    }
    extension = extension.split('?')[0];
    return extension;
  }
}
