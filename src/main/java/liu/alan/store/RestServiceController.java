package liu.alan.store;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class RestServiceController {

    @RequestMapping("/")
    public String index() {
        return "Greetings from Alan Liu!";
    }
    @GetMapping("/inventory.json")
    public ProductInventory[] inventory(){
    	List<ProductInventory> productList = new ArrayList<ProductInventory>();
    	productList.add(new ProductInventory("Item A", 100));
    	productList.add(new ProductInventory("Item B", 50));
    	productList.add(new ProductInventory("Item C", 10));
    	return productList.toArray(new ProductInventory[]{});
    }

}
