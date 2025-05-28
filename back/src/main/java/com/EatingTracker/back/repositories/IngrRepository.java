package com.EatingTracker.back.repositories;

import com.EatingTracker.back.entities.Ingr;

import java.util.UUID;

import org.springframework.data.jpa.repository.*;



public interface IngrRepository extends JpaRepository<Ingr, UUID> {
    Ingr findOneById(UUID id);
}
