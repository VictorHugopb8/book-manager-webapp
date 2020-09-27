import { Pipe } from "@angular/core";

@Pipe({
  name: "phone"
})
export class PhoneFormatterPipe {
  transform(rawNum) {
    let newStr = ""

    for (let i = 0; i < rawNum.length; i++) {
      if (rawNum.length >= 10 && i === 2) {
        newStr = newStr + " " + rawNum.substr(i, 1)
      } else if (i === rawNum.length - 4) {
        newStr = newStr + "-" + rawNum.substr(i, 1)
      } else {
        newStr = newStr + rawNum.substr(i, 1)
      }
    }

    return newStr
  }
}