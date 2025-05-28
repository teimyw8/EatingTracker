package exceptions;

import java.util.UUID;

public class MealNotFoundException extends RuntimeException {

        private UUID id;    
    
    public MealNotFoundException (UUID id) {
        this.id = id;
    }

    public String getMessage(){
        return "The ingr with UUID: " + this.id + " does not exist";
    }
}
