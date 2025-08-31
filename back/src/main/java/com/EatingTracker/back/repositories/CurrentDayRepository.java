package com.EatingTracker.back.repositories;

import com.EatingTracker.back.entities.CurrentDay;
import com.EatingTracker.back.entities.Ingr;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.UUID;

public interface CurrentDayRepository extends JpaRepository<CurrentDay, Date> {
}
