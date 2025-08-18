package com.EatingTracker.back.helpers;

import com.EatingTracker.back.entities.Ingr;
import com.EatingTracker.back.models.IngrModel;

public class IngrHelper {

//TODO i dont think these are necessary
    //cant this just be implemented as contructors?
    //same for mealhelper
    public static IngrModel ingrEntTo(Ingr ent){

        IngrModel newIngr = new IngrModel(ent.getCals(),ent.getProt(),ent.getName(), ent.getServG()) ;
        return newIngr;
    }

    public static Ingr toIngrEnt(IngrModel newIngr){
       
        Ingr newEnt = new Ingr(newIngr.getName(),newIngr.getCals(),newIngr.getServG(),newIngr.getProt() ) ;
        return newEnt;
    }

}
