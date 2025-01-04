export interface Ingredient{
    name: string;
    cal: number;
    p: number;
    c: number;
    f: number;
    serv: number;
    servOz: number;
}

export interface MealIngr {
    ingr: Ingredient;
    amm : number;
}

export interface Meal {
    name: string;
    totalServ: number;
    totalServOz: number;
    ingredientList: [MealIngr];

}

export const OZtoG : number = 28.3495;
export const GtoOZ : number = 0.035274;
export const Fcal : number = 9;
export const Ccal : number = 4;