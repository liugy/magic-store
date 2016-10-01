package liu.alan.store;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class SampleInventoryModelImp implements InventoryModel {
	private List<ProductAmount> productList = null;
	public SampleInventoryModelImp(){
		productList = new ArrayList<ProductAmount>();
    	productList.add(new ProductAmount("Item A", 100));
    	productList.add(new ProductAmount("Item B", 50));
    	productList.add(new ProductAmount("Item C", 10));

    }
	@Override
	public ProductAmount[] getInventory() {
		return productList.toArray(new ProductAmount[]{});
	}

	@Override
	public synchronized void takeOut(ProductAmount[] outProducts) throws StockoutException, BadParameterException{
		if(!isValidProductAmounts(outProducts))
			throw new BadParameterException("Some data is invalid.");
		if(isStockout(outProducts))
			throw new StockoutException("No enough products in the store.");
		for(int i = 0; i<outProducts.length; i++){
			for(int j=0; j< productList.size(); j++){
				ProductAmount inventoryAmount = productList.get(j);
				if (inventoryAmount.getName().equals(outProducts[i].getName())){
					inventoryAmount.setAmount(inventoryAmount.getAmount() - outProducts[i].getAmount());
				}
			}
		}
	}

	private boolean isValidProductAmounts(ProductAmount[] outProducts) {
		if (outProducts == null){
			return false;
		}
		for(int i = 0; i<outProducts.length; i++){
			boolean found=false;
			for(int j=0; j< productList.size(); j++){
				if (outProducts[i].getName().equals(outProducts[i].getName())){
					found=true;
				}
			}
			if(!found) return false;
		}
		return true;
	}
	@Override
	public synchronized void putIn(ProductAmount[] in) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean isStockout(ProductAmount[] outProducts) {
		for(int i = 0; i<outProducts.length; i++){
			for(int j=0; j< productList.size(); j++){
				ProductAmount inventoryAmount = productList.get(j);
				if (inventoryAmount.getName().equals(outProducts[i].getName())
						&& inventoryAmount.getAmount() < outProducts[i].getAmount()){
					return true;
				}
			}
		}
		return false;
	}
}
