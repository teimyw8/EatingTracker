package com.EatingTracker.back.controllers;


import com.EatingTracker.back.models.CurrentDayModel;
import com.EatingTracker.back.models.EatenItemModel;
import com.EatingTracker.back.services.CurrentDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@RestController
@RequestMapping("/day")
public class CurrentDayController {

    @Autowired
    CurrentDayService currentDayService;

    @GetMapping
    public ResponseEntity<CurrentDayModel> getDay(@RequestParam Date day){

        return currentDayService.getDay(day);
    }

    @PostMapping
    public ResponseEntity<String> addToDay(@RequestBody Date day, @RequestBody EatenItemModel item){

    }
}
