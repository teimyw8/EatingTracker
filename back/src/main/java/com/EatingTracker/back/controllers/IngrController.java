package com.EatingTracker.back.controllers;
import com.EatingTracker.back.entities.Ingr;
import com.EatingTracker.back.models.IngrModel;
import com.EatingTracker.back.services.IngrService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/ingr")
public class IngrController{

    /*
     *  TODO
     *  edit logic and hookup
     *  delete logic and hookup
     */
    @Autowired
    IngrService ingrService;

    @PostMapping()
    public ResponseEntity<Ingr> addIngr(@RequestBody IngrModel newIngr) {
       
        return ingrService.addIngr(newIngr);
    }

    @GetMapping()
    public ResponseEntity<Ingr> getIngr(@RequestParam UUID id) {

        return ingrService.getIngr(id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Ingr>> getAllIngr(@RequestParam Optional<Integer> max) {
      
            return ingrService.getAllIngr(max);
    }

    @PostMapping("/edit")
    public ResponseEntity<Ingr> editIngr(@RequestBody Ingr ingr){
        
        return ingrService.editIngr(ingr);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteIngr(@RequestParam UUID id){
        
        return ingrService.delIngr(id);
    }
    


}

