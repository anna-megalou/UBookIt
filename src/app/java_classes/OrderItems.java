package app.java_classes;

public class OrderItems {

    private int itemsId;
    private int orderId;
    private int bookId;

    // Default constructor
    public OrderItems() {}

    // Constructor χωρίς id (για insert)
    public OrderItems(int orderId, int bookId) {
        this.orderId = orderId;
        this.bookId = bookId;
    }

    // Constructor πλήρης
    public OrderItems(int itemsId, int orderId, int bookId) {
        this.itemsId = itemsId;
        this.orderId = orderId;
        this.bookId = bookId;
    }

    // Getters & Setters
    public int getItemsId() {
        return itemsId;
    }

    public void setItemsId(int itemsId) {
        this.itemsId = itemsId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

}
