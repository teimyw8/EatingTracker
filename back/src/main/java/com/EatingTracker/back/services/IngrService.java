package com.EatingTracker.back.services;

import com.EatingTracker.back.entities.Ingr;
import com.EatingTracker.back.helpers.IngrHelper;
import com.EatingTracker.back.models.IngrModel;
import com.EatingTracker.back.repositories.IngrRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Service
public class IngrService {

    @Autowired
    IngrRepository ingrRepository;

    public ResponseEntity<Ingr> addIngr(IngrModel x) {

        Ingr newEnt = IngrHelper.toIngrEnt(x);

        try {

            Ingr savedIngr = ingrRepository.saveAndFlush(newEnt);
            return new ResponseEntity<Ingr>(savedIngr, HttpStatus.OK);

        } catch (Exception e) {

            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    public ResponseEntity<Ingr> getIngr(UUID id) {

        try {

            Ingr newIngr = ingrRepository.findById(id).orElseThrow(() -> new RuntimeException("record not found"));
            return new ResponseEntity<Ingr>(newIngr, HttpStatus.OK);

        } catch (Exception e) {

            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);

        }
    }

    public ResponseEntity<List<Ingr>> getAllIngr(Optional<Integer> max) {

        try {
            List<Ingr> fullIngrs = ingrRepository.findAll();

            if (max.isPresent()) {

                List<Ingr> ingrs = fullIngrs.subList(0, max.get());
                return new ResponseEntity<>(ingrs, HttpStatus.OK);

            } else {

                return new ResponseEntity<>(fullIngrs, HttpStatus.OK);
            }

        } catch (Exception e) {

            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Ingr> editIngr(Ingr newIngr) {
        try {
            Ingr oldIngr = ingrRepository.findOneById(newIngr.getId());

            oldIngr.update(newIngr);
            Ingr savedIngr = ingrRepository.save(oldIngr);

            return new ResponseEntity<Ingr>(savedIngr, HttpStatus.OK);

        } catch (Exception e) {

            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> delIngr(UUID id) {
        
        if(ingrRepository.findById(id).isPresent()){

            ingrRepository.deleteById(id);
            return new ResponseEntity<String>("Ingredient deleted successfully",HttpStatus.OK);
        } else {

            return new ResponseEntity<String>("Ingredient doesnt exist",HttpStatus.UNPROCESSABLE_ENTITY);
        }

    }

    public boolean existsInDB(UUID id){
        return ingrRepository.existsById(id);
    }

}
