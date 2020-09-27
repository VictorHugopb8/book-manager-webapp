import { Pipe } from "@angular/core";

@Pipe({
    name: "cpf"
})
export class CpfFormatterPipe {

    transform(cpf){
        //remove unnecessary characters...
        cpf = cpf.replace(/[^\d]/g, "");
      
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      }

}