export interface Ingredient{
    name: string;
    cal: number | undefined;
    p: number;
    c: number | undefined;
    f: number | undefined;
    serv: number | undefined;
    servOz: number | undefined;
}

//TODO Make MealIngr into a class;
/*
implement function total Cal total P 
export class MealIngr {
ingr: Ingredient;
amount: number;
}
*/
export interface MealIngr {
    ingr: Ingredient;
    servsConsumed : number;
}

 export interface MealInter {
    name: string;
    ingredientList: Array<MealIngr>;
    
}

export class Meal implements MealInter {
    name :string
    ingredientList : Array<MealIngr>
   
    
    constructor(name :string, ingredientList : Array<MealIngr> ) {
        this.name = name,
        this.ingredientList = ingredientList
    }
    totalCal(){
        var sumCal : number = 0;
        if(this.ingredientList){
            this.ingredientList.forEach(element => {
                if(element.ingr.cal){
                    sumCal += (element.ingr.cal * element.servsConsumed)
                } else if(element.ingr.c && element.ingr.p && element.ingr.f) {
                    sumCal += element.ingr.c * Ccal * element.servsConsumed
                    sumCal += element.ingr.p * Ccal * element.servsConsumed
                    sumCal += element.ingr.f * Fcal * element.servsConsumed
                }
            });
        }
        return sumCal;
    }
    totalP(){
        var sumP : number = 0;
        if(this.ingredientList){
            this.ingredientList.forEach(element => {
                sumP+=element.ingr.p* element.servsConsumed;
            });
        }
        return sumP;
    }
    servingSize(){
        var sumServing : number = 0;
        if(this.ingredientList){
            this.ingredientList.forEach(element => {
                sumServing+= element.servsConsumed
            });
        }
        return sumServing;
    }
}

export interface EatenEntry {
    name: string;
    cal: number;
    p: number;
    servings: number;   
}


export interface Displayable{
    type: DisplayListType;
    name: string;
    ingrList : MealIngr[];
    isClicked: boolean;    

}
export enum DisplayListType {
    MEAL = 1,
    INGR = 2
  }

export const OZtoG : number = 28.3495;
export const GtoOZ : number = 0.035274;
export const Fcal : number = 9;
export const Ccal : number = 4;