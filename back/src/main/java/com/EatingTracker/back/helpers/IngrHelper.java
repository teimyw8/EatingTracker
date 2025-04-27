package com.EatingTracker.back.helpers;

import com.EatingTracker.back.entities.IngrEnt;
import com.EatingTracker.back.models.Ingr;

public class IngrHelper {


    public static Ingr ingrEntTo(IngrEnt ent){
        IngrEnt tempEnt = ent;
        Ingr newIngr = new Ingr(ent.getCals(),ent.getProt(),ent.getName(), ent.getServG()) ;
        return newIngr;
    }

    public static IngrEnt toIngrEnt(Ingr newIngr){
        Ingr tempIngr = newIngr;
        IngrEnt newEnt = new IngrEnt(newIngr.getName(),newIngr.getCals(),newIngr.getServG(),newIngr.getProt() ) ;
        return newEnt;
    }

}
