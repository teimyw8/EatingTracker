package com.EatingTracker.back.controllers;
import com.EatingTracker.back.entities.Ingr;
import com.EatingTracker.back.models.DisplayListItemModel;
import com.EatingTracker.back.models.IngrModel;
import com.EatingTracker.back.services.IngrService;
import com.EatingTracker.back.services.ProspectListService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/prospectList")

public class ProspectListController {

    @Autowired
    private ProspectListService prospectListService;

    @GetMapping()
    public ResponseEntity<List<DisplayListItemModel>> getProspectList(@RequestParam Optional<Integer> max) {
        return prospectListService.getProspectList(max);
        
    }
    
}
