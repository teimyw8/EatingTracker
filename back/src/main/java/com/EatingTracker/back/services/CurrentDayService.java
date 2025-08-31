package com.EatingTracker.back.services;

import com.EatingTracker.back.models.CurrentDayModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;

@Service
public class CurrentDayService {

    public ResponseEntity<CurrentDayModel> getDay(Date day){

    }
}
