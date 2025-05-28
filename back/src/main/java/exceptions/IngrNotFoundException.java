package exceptions;

import java.util.UUID;

public class IngrNotFoundException extends RuntimeException {

    private UUID id;    
    
    public IngrNotFoundException(UUID id) {
        this.id = id;
    }

    public String getMessage(){
        return "The ingr with UUID: " + this.id + " does not exist";
    }


}
