package com.EatingTracker.back.services;

import com.EatingTracker.back.entities.EatenItemType;
import com.EatingTracker.back.entities.EatenListItem;
import com.EatingTracker.back.entities.Ingr;
import com.EatingTracker.back.models.*;
import com.EatingTracker.back.repositories.EatenListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CurrentDayService {

    @Autowired
    EatenListRepository eatenListRepository;

    @Autowired
    MealService mealService;

    @Autowired
    IngrService ingrService;


    public ResponseEntity<CurrentDayModel> getDay(Date day){

        CurrentDayModel currentDay = new CurrentDayModel();
        currentDay.setToday(day);
        List<EatenItemModel> eModelList = new ArrayList<EatenItemModel>();

        List<EatenListItem> eatenListItem = eatenListRepository.findByDate(day);

        // for each eaten item found, convert to eaten item model and add to list
        for (EatenListItem e : eatenListItem){

            EatenItemModel eModel = new EatenItemModel();

            if(e.getType() == EatenItemType.INGR){
                //Retrieve details by ID then convert to DisplayListItemModel
                ResponseEntity<Ingr> response = ingrService.getIngr(e.getItemId());
                if(response.getStatusCode() == HttpStatus.OK){
                    eModel.setItem( new DisplayListItemModel(EatenItemType.INGR, new IngrModel(response.getBody()) ) );
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }


            } else {
                ResponseEntity<MealModel> response = mealService.getMeal(e.getItemId());
                if(response.getStatusCode() == HttpStatus.OK){
                    eModel.setItem( new DisplayListItemModel(EatenItemType.MEAL, response.getBody()) );
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }

            eModel.setAmm(e.getAmm());
            eModelList.add(eModel);
        }

        currentDay.setEatenList(eModelList);


        return new ResponseEntity<CurrentDayModel>(currentDay,HttpStatus.OK);


    }

    public ResponseEntity<String> addItemToDay(Date day, EatenItemModel item){

        EatenListItem itemToAdd = new EatenListItem();



        if(item.getItem().getType() == EatenItemType.INGR){

            if(item.getItem().getMeal() != null &&
                    !( item.getItem().getMeal().getId() == null || item.getItem().getMeal().getId().isEmpty() ) ) {

                itemToAdd.setItemId( UUID.fromString( item.getItem().getMeal().getId() ) );
                itemToAdd.setAmm(item.getAmm());
                itemToAdd.setDayId(day);
                itemToAdd.setType(item.getItem().getType());
            } else {
                return new ResponseEntity<String>("Meal doesnt exist or Meal id is invalid", HttpStatus.BAD_REQUEST);
            }
        } else {
            if(item.getItem().getIngr() != null &&
                    !( item.getItem().getIngr().getId() == null || item.getItem().getIngr().getId().isEmpty() ) ) {

                itemToAdd.setItemId( UUID.fromString( item.getItem().getIngr().getId() ) );
                itemToAdd.setAmm(item.getAmm());
                itemToAdd.setDayId(day);
                itemToAdd.setType(item.getItem().getType());
            } else {
                return new ResponseEntity<String>("Ingr doesnt exist or Ingr id is invalid", HttpStatus.BAD_REQUEST);
            }
        }

        eatenListRepository.saveAndFlush(itemToAdd);
        return new ResponseEntity<String>("Item added", HttpStatus.OK);
    }

}
