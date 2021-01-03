# ESC/POS library

## Features:

- Adapters for Serial
                           
## Usage example:

```bash
npm install github:workgroupengineering/escpos.adapters.serial@latest
```

```javascript
import { Printer } from 'escpos';
import { Commands } from 'escpos';
import { Serial } from 'escpos.adapters.serial';

const adapter = new Serial("COM1:");
const printer = await new Printer(adapter).open();
                           
printer.setFont(Commands.Font.A)
       .setJustification(Commands.Justification.Center)
       .setTextMode(Commands.TextMode.DualWidthAndHeight)
       .writeLine("This is some large centered text")
       .setTextMode(Commands.TextMode.Normal)
       .setJustification(Commands.Justification.Left)
       .writeLine("Some normal text")
       .feed(4)
       .close()
       .then(() => console.log("Done printing..."));
```
