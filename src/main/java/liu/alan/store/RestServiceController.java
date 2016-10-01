package liu.alan.store;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestServiceController {
	@Autowired
	private InventoryModel inventoryModel;
    
    @GetMapping("/inventory.json")
    public ProductAmount[] inventory(){
    	return inventoryModel.getInventory();
    }
    
    @PostMapping("/checkout.json")
    public @ResponseBody ProductAmount[] checkout(@RequestBody ProductAmount[] orderItems, HttpServletResponse response) throws IOException{
		try {
			inventoryModel.takeOut(orderItems);
		} catch (StockoutException e) {
            response.sendError(HttpServletResponse.SC_REQUESTED_RANGE_NOT_SATISFIABLE, e.getMessage());
		} catch (BadParameterException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
		}
		return inventory();	
    }
}
