import SerialPort from "serialport";
import { Adapter } from "escpos";

export default class Serial extends Adapter {
  private device: SerialPort;

  constructor(path: string, options: SerialPort.OpenOptions) {
    super();
    options.autoOpen = false;
    this.device = new SerialPort(path, options);
  }

  public async open(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.device.open((err) => {
        if (err) {
          throw err;
        }
        resolve();
      });
    });
  }

  public async write(data: Uint8Array): Promise<void> {
    return new Promise<void>((resolve) => {
      this.throwIfNeeded();
      this.device.write(Buffer.from(data), (err, written) => {
        if (err) {
          throw new Error("Failed to write to serial device");
        }
        resolve();
      });
    });
  }

  public async close(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.throwIfNeeded();
      this.device.drain(() => {
        this.device.close();
        resolve();
      });
    });
  }

  private throwIfNeeded(reason?: string) {
    if (!this.device) {
      throw new Error(reason || "The serial device is not open");
    }
  }
}
