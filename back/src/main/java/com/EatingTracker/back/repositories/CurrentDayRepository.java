package com.EatingTracker.back.repositories;

import com.EatingTracker.back.entities.CurrentDay;
import com.EatingTracker.back.entities.Ingr;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.UUID;

public interface CurrentDayRepository extends JpaRepository<CurrentDay, LocalDate> {
}
