package liu.alan.store;

public class ProductAmount {
	private String name;

	private int amount;
	public ProductAmount(){
		
	}
	public ProductAmount(String name, int amount) {
		this();
		this.name = name;
		this.amount = amount;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
}
