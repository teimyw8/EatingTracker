package com.EatingTracker.back.controllers;
import com.EatingTracker.back.models.Ingr;
import com.EatingTracker.back.services.IngrService;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/ingr")
public class IngrController{


    @Autowired
    IngrService ingrService;

    @PostMapping()
    public String addIngr(@RequestBody Ingr newIngr) {
        ingrService.addIngr(newIngr);
        return "created";
    }


}

