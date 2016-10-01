package liu.alan.store;

public interface InventoryModel {
	public ProductAmount[] getInventory();
	public void takeOut(ProductAmount[] out) throws StockoutException, BadParameterException;
	public void putIn(ProductAmount[] in);
	public boolean isStockout(ProductAmount[] out);
}
