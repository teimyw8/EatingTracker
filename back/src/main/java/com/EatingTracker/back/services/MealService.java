package com.EatingTracker.back.services;

import com.EatingTracker.back.models.MealIngrModel;
import com.EatingTracker.back.models.MealModel;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.EatingTracker.back.repositories.IngrRepository;
import com.EatingTracker.back.repositories.MealIngrRepository;
import com.EatingTracker.back.repositories.MealRepository;

import exceptions.IngrNotFoundException;
import exceptions.MealNotFoundException;

import com.EatingTracker.back.entities.Meal;
import com.EatingTracker.back.entities.MealIngr;

@Service
public class MealService {


    @Autowired 
    MealRepository mealRepository;

    @Autowired
    MealIngrRepository mealIngrRepository;

    @Autowired
    IngrRepository ingrRepository;

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<Meal> addMeal(MealModel newMeal){
        //Assume ingrs have been created
        //for each ingr in list check if 

        Meal mealToAdd = new Meal(newMeal.getName());
        mealRepository.save(mealToAdd);

        
        for ( MealIngrModel x : newMeal.getIngrs() ){

            if( ingrRepository.findById( UUID.fromString(x.getIngrId()) ).isPresent() ) {
                
                MealIngr tempMealIngr = new MealIngr(UUID.fromString(x.getIngrId()), mealToAdd.getId(), x.getAmm());
                
                mealIngrRepository.save(tempMealIngr);

            } else {
                
                throw new IngrNotFoundException(UUID.fromString(x.getIngrId()));
            }
                        
        }

        mealRepository.flush();
        mealIngrRepository.flush();
        
        return new ResponseEntity<Meal>(mealToAdd, HttpStatus.OK);
    }

    public ResponseEntity<MealModel> getMeal(UUID id){
        Optional<Meal> possibleMeal = mealRepository.findById(id);
        
        if(possibleMeal.isPresent()){
                //Convert returned meal into MealModel(frontend consumable form) and put into ResponseEntity with 200 status to return
               Meal returnedMeal = possibleMeal.get();

               List<MealIngr> mealIngrs = mealIngrRepository.findByMealid(returnedMeal.getId());

               MealModel returnedMealModel = new MealModel(returnedMeal.getName() , MealIngrRepository.mealIngrListToModel(mealIngrs));

               return new ResponseEntity<MealModel>(returnedMealModel, HttpStatus.OK);
        } else {
            // Nothing returned by query, throw MealNotFound
            throw new MealNotFoundException(id);
        }
    }

    public ResponseEntity<List<Meal>> getAllMeal(Optional<Integer> max){

        List<Meal> mealList = mealRepository.findAll();
        if(max.isPresent()){
            mealList = mealList.subList(0, max.get());
        }

        return new ResponseEntity<List<Meal>>(mealList, HttpStatus.OK);

    }

    public void editMeal(int id){

    }

    public void delMeal(int id) {
        
    }
}

