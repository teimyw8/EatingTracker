package com.EatingTracker.back.services;

import com.EatingTracker.back.entities.EatenItemType;
import com.EatingTracker.back.entities.EatenListItem;
import com.EatingTracker.back.entities.Ingr;
import com.EatingTracker.back.models.*;
import com.EatingTracker.back.repositories.EatenListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
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


    public ResponseEntity<CurrentDayModel> getDay(LocalDate day) {

        CurrentDayModel currentDay = new CurrentDayModel();
        currentDay.setToday(day);
        List<EatenItemModel> eModelList = new ArrayList<EatenItemModel>();

        List<EatenListItem> eatenListItem = eatenListRepository.findByDayid(day);

        // for each eaten item found, convert to eaten item model and add to list
        for (EatenListItem e : eatenListItem) {

            EatenItemModel eModel = new EatenItemModel();

            if (e.getType() == EatenItemType.INGR) {
                //Retrieve details by ID then convert to DisplayListItemModel
                ResponseEntity<Ingr> response = ingrService.getIngr(e.getItemId());
                if (response.getStatusCode() == HttpStatus.OK) {
                    eModel.setItem(new DisplayListItemModel(EatenItemType.INGR, new IngrModel(response.getBody())));
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }


            } else {
                ResponseEntity<MealModel> response = mealService.getMeal(e.getItemId());
                if (response.getStatusCode() == HttpStatus.OK) {
                    eModel.setItem(new DisplayListItemModel(EatenItemType.MEAL, response.getBody()));
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }

            eModel.setAmm(e.getAmm());
            eModelList.add(eModel);
        }

        currentDay.setEatenList(eModelList);


        return new ResponseEntity<CurrentDayModel>(currentDay, HttpStatus.OK);


    }

    public ResponseEntity<String> addItemToDay( EatenItemInputModel item) {

        EatenListItem itemToAdd = new EatenListItem();

        LocalDate date; //Check date valid
        try {
            date = LocalDate.parse(item.getDay());
        } catch (DateTimeParseException e) {
            return new ResponseEntity<>("Date is invalid", HttpStatus.BAD_REQUEST);
        }

        if (item.getId() == null || item.getId().isEmpty()) {  //Check ID valid
            return new ResponseEntity<>("Id is empty or null", HttpStatus.BAD_REQUEST);
        }


        if (item.getType() == EatenItemType.INGR) {

            //Check if ID actually exists in DB
            if(ingrService.existsInDB(UUID.fromString (item.getId() )) ){

                itemToAdd.setItemId( UUID.fromString (item.getId() ) );
                itemToAdd.setAmm(item.getAmm());
                itemToAdd.setDayId(date);
                itemToAdd.setType(item.getType());
            } else {
                return new ResponseEntity<>( String.format("Ingr with ID %s does not exist", item.getId()), HttpStatus.BAD_REQUEST);
            }
        } else {
            if(mealService.existsInDB(UUID.fromString (item.getId() )) ){

                itemToAdd.setItemId( UUID.fromString (item.getId() ) );
                itemToAdd.setAmm(item.getAmm());
                itemToAdd.setDayId(date);
                itemToAdd.setType(item.getType());
            } else {
                return new ResponseEntity<>( String.format("Meal with ID %s does not exist", item.getId()), HttpStatus.BAD_REQUEST);
            }
        }

        eatenListRepository.saveAndFlush(itemToAdd);
        return new ResponseEntity<String>("Item added", HttpStatus.OK);
    }

}
