package com.EatingTracker.back.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.EatingTracker.back.entities.EatenItemType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.EatingTracker.back.entities.Ingr;
import com.EatingTracker.back.entities.Meal;
import com.EatingTracker.back.models.DisplayListItemModel;
import com.EatingTracker.back.models.MealIngrModel;
import com.EatingTracker.back.models.MealModel;
import com.EatingTracker.back.models.IngrModel;
import com.EatingTracker.back.repositories.IngrRepository;
import com.EatingTracker.back.repositories.MealIngrRepository;
import com.EatingTracker.back.repositories.MealRepository;

@Service
public class ProspectListService {

    @Autowired
    MealRepository mealRepository;

    @Autowired
    MealIngrRepository mealIngrRepository;

    @Autowired
    IngrRepository ingrRepository;
    
    public ResponseEntity<List<DisplayListItemModel>> getProspectList(Optional<Integer> max) {
        
        ArrayList<DisplayListItemModel> prospectList = new ArrayList<DisplayListItemModel>(); 

        //Get meals
        List<Meal> mealList = mealRepository.findAll();

        System.out.println("Meal List: " + mealList);
        
        // Get ingredients
        List<Ingr> ingrList = ingrRepository.findAll();

        System.out.println("Ingr List: " + ingrList);

        for( Meal meal : mealList ) {

            List<MealIngrModel> mealIngrs = MealIngrRepository.mealIngrListToModel(mealIngrRepository.findByMealid(meal.getId()));
            DisplayListItemModel item = new DisplayListItemModel(EatenItemType.MEAL, new MealModel(meal, mealIngrs));
            prospectList.add(item);
        }

        for( Ingr ingr : ingrList ) {

            DisplayListItemModel item = new DisplayListItemModel(EatenItemType.INGR, new IngrModel(ingr));
            prospectList.add(item);
        }

        return new ResponseEntity<List<DisplayListItemModel>>(prospectList, HttpStatus.OK); 
    }   
}
