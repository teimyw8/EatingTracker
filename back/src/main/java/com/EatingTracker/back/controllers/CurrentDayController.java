package com.EatingTracker.back.controllers;


import com.EatingTracker.back.models.CurrentDayModel;
import com.EatingTracker.back.models.EatenItemInputModel;
import com.EatingTracker.back.models.EatenItemModel;
import com.EatingTracker.back.services.CurrentDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/day")
public class CurrentDayController {

    @Autowired
    CurrentDayService currentDayService;

    @GetMapping
    public ResponseEntity<CurrentDayModel> getDay(@RequestParam LocalDate day){

        return currentDayService.getDay(day);
    }

    @PostMapping
    public ResponseEntity<String> addToDay( @RequestBody EatenItemInputModel input){
        return currentDayService.addItemToDay( input);
    }
}
