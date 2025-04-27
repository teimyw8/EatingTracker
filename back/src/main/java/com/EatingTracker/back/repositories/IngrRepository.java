package com.EatingTracker.back.repositories;

import com.EatingTracker.back.entities.IngrEnt;
import org.springframework.data.jpa.repository.*;



public interface IngrRepository extends JpaRepository<IngrEnt, Long> {

}
