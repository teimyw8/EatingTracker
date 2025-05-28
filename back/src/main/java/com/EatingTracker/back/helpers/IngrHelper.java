package com.EatingTracker.back.helpers;

import com.EatingTracker.back.entities.Ingr;
import com.EatingTracker.back.models.IngrModel;

public class IngrHelper {


    public static IngrModel ingrEntTo(Ingr ent){

        IngrModel newIngr = new IngrModel(ent.getCals(),ent.getProt(),ent.getName(), ent.getServG()) ;
        return newIngr;
    }

    public static Ingr toIngrEnt(IngrModel newIngr){
       
        Ingr newEnt = new Ingr(newIngr.getName(),newIngr.getCals(),newIngr.getServG(),newIngr.getProt() ) ;
        return newEnt;
    }

}
