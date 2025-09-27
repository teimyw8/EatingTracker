package com.EatingTracker.back.services;

import com.EatingTracker.back.entities.EatenItemType;
import com.EatingTracker.back.entities.EatenListId;
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
import java.util.Optional;
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
                    return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
                }


            } else {
                ResponseEntity<MealModel> response = mealService.getMeal(e.getItemId());
                if (response.getStatusCode() == HttpStatus.OK) {
                    eModel.setItem(new DisplayListItemModel(EatenItemType.MEAL, response.getBody()));
                } else {
                    return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
                }
            }

            eModel.setAmm(e.getAmm());
            eModelList.add(eModel);
        }

        currentDay.setEatenList(eModelList);


        return new ResponseEntity<CurrentDayModel>(currentDay, HttpStatus.OK);


    }

    public ResponseEntity<String> addItemToDay( EatenItemInputModel item) {

        if(item.getType() == -1){
            return new ResponseEntity<>("type == -1 aka empty", HttpStatus.UNPROCESSABLE_ENTITY);
        }


        LocalDate date; //Check date valid
        try {
            date = LocalDate.parse(item.getDay());
        } catch (DateTimeParseException e) {
            return new ResponseEntity<>("Date is invalid", HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (item.getId() == null || item.getId().isEmpty()) {  //Check ID valid
            return new ResponseEntity<>("Id is empty or null", HttpStatus.UNPROCESSABLE_ENTITY);
        }


        if (item.getType() == 1) {

            //Check if ID actually exists in DB
            if(!ingrService.existsInDB(UUID.fromString (item.getId() )) ){
                return new ResponseEntity<>( String.format("Ingr with ID %s does not exist", item.getId()), HttpStatus.UNPROCESSABLE_ENTITY);
            }
        } else if (item.getType() == 0) {

            if(!mealService.existsInDB(UUID.fromString (item.getId() )) ){
                return new ResponseEntity<>( String.format("Meal with ID %s does not exist", item.getId()), HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }

        //Check if this item has been eaten on this day
        //if so combine amounts and save
        //else create new
        EatenListId entryID = new EatenListId( date, UUID.fromString(item.getId()) ) ;
        if( eatenEntryExists( entryID ) ){

            Optional<EatenListItem> existingEntryPossible = eatenListRepository.findById(entryID);
            if(existingEntryPossible.isPresent()){
                EatenListItem existingEntry = existingEntryPossible.get();
                existingEntry.setAmm( existingEntry.getAmm() + item.getAmm() );
                eatenListRepository.saveAndFlush(existingEntry);
            } else {
                return new ResponseEntity<String>("Somehow eatenEntryExists returned true but repository didnt find anything", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {

            EatenListItem itemToAdd = new EatenListItem();
            itemToAdd.setItemId( UUID.fromString (item.getId() ) );
            itemToAdd.setAmm(item.getAmm());
            itemToAdd.setDayId(date);
            itemToAdd.setType( EatenItemType.values()[item.getType()] );
            eatenListRepository.saveAndFlush(itemToAdd);
        }

        return new ResponseEntity<String>("Item added", HttpStatus.OK);
    }

    public boolean eatenEntryExists(EatenListId input){
        return eatenListRepository.existsById(input);
    }

}
