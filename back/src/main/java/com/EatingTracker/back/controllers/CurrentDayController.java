package com.EatingTracker.back.controllers;


import com.EatingTracker.back.models.CurrentDayModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;

@RestController
@RequestMapping("/day")
public class CurrentDayController {

    @GetMapping
    public ResponseEntity<CurrentDayModel> getDay(@RequestParam Date day){


    }
}
