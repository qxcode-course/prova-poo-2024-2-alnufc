import { time } from "console";

function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

//FALTOU APENAS O CASO 19

/*
- Vamos modelar um notebook que pode ter ou não tanto carregador quanto bateria. ----

- Terá que reescrever os métodos `usar <tempo>`, `ligar`.

- Só poderá `ligar` se tiver carga na bateria ou carregador.
- Enquanto em uso
  - se tiver apenas na bateria, a carga da bateria deve diminuir.
  - se estiver na bateria e no carregador, a carga deve aumentar.
- O carregador possui uma potência que implica na quantidade de carga carregada por unidade de tempo.
- A bateria possui uma carga e uma capacidade que representam a carga atual e o máximo possível de carga.
- Para simplificar, vamos utilizar minutos como a unidade de tempo e de carga.
- Uma bateria `15/50` significa que possui ainda 15 minutos de carga e suporta no máximo 50.
- Um carregador com 3 de potência consegue em um minuto de uso, adicionar 3 minutos de carga na bateria.
*/


class Bateria 
{
    private _carga: number
    private _cargaMaxima: number

    constructor(cargaMaxima: number)
    {
        this._cargaMaxima = cargaMaxima
        this._carga = this._cargaMaxima
    }

    getCarga(): number 
    {
        return this._carga
    }

    setCarga(valor: number)
    {
       // this._carga = this._cargaMaxima ja é definido no construtor
       this._carga = valor
    }

    getCargaMaxima(): number 
    {
        return this._cargaMaxima
    }

    setCargaMaxima(valor: number)
    {
        this._cargaMaxima = valor
    }

    toString(): string
    {
        return `Bateria ${this._carga}/${this._cargaMaxima}`
    }
}

class Carregador 
{
    private _potecia: number

    constructor(potencia: number)
    {
        this._potecia = potencia
    }

    getPotencia(): number
    {
        return this._potecia
    }

    setPotencia(valor: number)
    {
        this._potecia = valor
    }

    toString(): string
    {
        return `Carregador ${this._potecia}W`
    }
}

class Notebook
{
    bateria: Bateria | null // pode existir ou ser nulo
    carregador: Carregador | null // pode existir ou ser nulo

    private _isOn: boolean // o notebook pode estar delisgado ou ligado
    private _haveBatery: boolean
    private _isCharging: boolean

    private _onTime: number

    // o notebook precisa de uma bateria ou esta carregando

    constructor()
    {
        this._isOn = false // o notebook começa desligado
        this._haveBatery = false // nao começa com bateria
        this._isCharging = false // nao começa carregando
        this._onTime = 0
    }


    toString(): string // nao completo
    {
        let saidaString: string = ""

        if(this._isOn)
            {
                saidaString += `Notebook: ligado por ${this._onTime} min`
            }
        if(!this._isOn) 
            {
                saidaString += `Notebook: desligado`
            }
        if(this._isCharging) 
            {
                saidaString += `, ${this.carregador?.toString()

                }`
            }
        if(this._haveBatery)
            {
                saidaString += `, ${this.bateria?.toString()}`
            }

     return saidaString   
    }

    turnOn(): void // completo
    {
        if(!this._haveBatery && !this._isCharging)
            {
                console.log("fail: não foi possível ligar")
                return
            }
        else
        {
            this._isOn = true
        }
    }

    turnOff(): void // completo
    {
        if(this._isOn)
            {
                this._isOn = false
                return
            }
        else if(!this._isOn)
        {
            return
        }
    }
    
    setCharger(potencia: number): void
    {
        if(this._isCharging)
            {
                console.log("fail: carregador já conectado")
                return
            }
        this.carregador = new Carregador(potencia)
        this._isCharging = true
        this.carregador.setPotencia(potencia)
    }

    removeCharger(): string 
    {
        if(this._isCharging)
            {
               // console.log(`Removido ${this.carregador?.getPotencia()}W`)
                this._isCharging = false
                this._isOn = false
                return `${this.carregador?.getPotencia()}W`
            }
        if(!this._isCharging)
            {
                //console.log("fail: Sem carregador")
                return ``
            }
        return ``
    }

    setBattery(carga: number) 
    {
        this.bateria = new Bateria(carga)
        this._haveBatery = true
        this.bateria.setCargaMaxima(carga)
    }

    removeBattery(): string 
    {
        if(this._haveBatery)
            {
                this._haveBatery = false
                this._isOn = false // nao ta completo aqui!!!!!!!!!!!!!!!!
                return `${this.bateria?.getCarga()}/${this.bateria?.getCargaMaxima()}`
            }
        return ``
    }

    use(tempo: number): void
    {
        /*
        if(!this._isOn)
            {
                console.log("fail: desligado")
            }
        if(this._isOn)
            {
                if(this.bateria?.getCarga() <=  0)
                    {
                        console.log("fail: descarregou")
                        this._isOn = false
                        this.bateria?.setCarga(0)
                        return
                    }
                else{

                }
               
            }
        ///////// nao  completo
        */

        let carga = this.bateria?.getCarga() // gambiarra
        let cargaMaxima = this.bateria?.getCargaMaxima()// gambiarra

        let potencia = this.carregador?.getPotencia()

        if(!this._isOn)
            {
                console.log("fail: desligado")
            }
        if(this._isOn)
            {
                if(this._isCharging) // a bateria nao é gasta, ela recebe
                    {
                        if(this._haveBatery) //ultimo if
                            {
                                if(carga! + (tempo * potencia!) > cargaMaxima!) // caso ultrapasse o limite
                                    {
                                       this.bateria?.setCarga(this.bateria.getCargaMaxima())
                                        this._onTime += tempo
                                        return
                                    }else 
                                    {
                                        this.bateria?.setCarga(this.bateria.getCarga() + (potencia! * tempo))
                                        this._onTime += tempo
                                        return
                                    }

                            }
                        if(!this._haveBatery)
                            {
                                this._onTime += tempo
                                return
                            }

                    }
                if(!this._isCharging) // nao ta carregando
                    {
                        if(this._haveBatery)
                            {
                                if(carga! - tempo <= 0)// verifica se a bateria nao vai ficar negativa
                                    {
                                        console.log("fail: descarregou")
                                        this._isOn = false
                                        this.bateria?.setCarga(0)
                                    }
                                    else
                                    {
                                this._onTime += tempo
                                this.bateria?.setCarga(this.bateria.getCarga() - tempo)
                                return
                                    }

                            }
                        if(!this._haveBatery)
                            {
                                return
                            }
                    }
            }

    }



}



class Adapter {
    private notebook: Notebook = new Notebook();
    show(): void {
        console.log(this.notebook.toString());
    }

    turnOn(): void {
        this.notebook.turnOn();
    }

    turnOff(): void {
        this.notebook.turnOff();
    }

    setCharger(power: number): void {
        this.notebook.setCharger(power)
    }

    removeCharger(): void {
    
        let charger = this.notebook.removeCharger(); // é um metodo que retorna uma string
         if (charger) {
             console.log(`Removido ${charger}`);
         } else {
             console.log("fail: Sem carregador");
         }
        
    }

    setBattery(capacity: number): void {
        this.notebook.setBattery(capacity)
    }

    removeBattery(): void {
        let battery = this.notebook.removeBattery();
         if (battery) {
            console.log(`Removido ${battery}`);
         } else {
             console.log("fail: Sem bateria");
         }
    }

    use(minutes: number): void {
        this.notebook.use(minutes);
    }
}

// Função principal
function main() {
    const adapter = new Adapter();
    while (true) {
        let line = input();
        let args = line.split(" ");
        write("$" + line);

        if      (args[0] === "end"        ) { break;                           }
        else if (args[0] === "show"       ) { adapter.show();                  }
        else if (args[0] === "turn_on"    ) { adapter.turnOn();                }
        else if (args[0] === "turn_off"   ) { adapter.turnOff();               }
        else if (args[0] === "use"        ) { adapter.use(+args[1]);           }
        else if (args[0] === "set_charger") { adapter.setCharger(+args[1]);    }
        else if (args[0] === "rm_charger" ) { adapter.removeCharger();         }
        else if (args[0] === "set_battery") { adapter.setBattery(+args[1]);    }
        else if (args[0] === "rm_battery" ) { adapter.removeBattery();         }
        else                                { write("fail: comando inválido"); }

    }
}

main();
