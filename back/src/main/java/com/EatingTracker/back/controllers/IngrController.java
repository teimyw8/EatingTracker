package com.EatingTracker.back.controllers;
import com.EatingTracker.back.models.IngrModel;
import com.EatingTracker.back.services.IngrService;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/ingr")
public class IngrController{

    // TODO HOOKUP TO SERVICE METHODS AND DECIDE RESPONSE FORMAT
    @Autowired
    IngrService ingrService;

    @PostMapping()
    public String addIngr(@RequestBody IngrModel newIngr) {
        ingrService.addIngr(newIngr);
        return "created";
    }

    @GetMapping()
    public String getIngr(@RequestParam String id) {
        return new String();
    }

    @GetMapping("/all")
    public String getAllIngr(@RequestParam String max) {
        return new String();
    }

    @PostMapping("/edit")
    public String editIngr(@RequestBody String id){
        return new String();

    }

    @PostMapping("/delete")
    public String deleteIngr(@RequestBody String id){
        return new String();

    }
    


}

