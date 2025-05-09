package com.EatingTracker.back.repositories;

import com.EatingTracker.back.entities.Ingr;
import org.springframework.data.jpa.repository.*;



public interface IngrRepository extends JpaRepository<Ingr, Long> {

}
