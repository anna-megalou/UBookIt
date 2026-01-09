package app.java_classes;

import java.sql.Timestamp;
import java.util.List;

public class Order {
    private int orderId;
    private String userId;
    private Timestamp orderDate;
    private String status;
    private List<Book> selectedBooks;
    private double totalPrice;

    // Default constructor
    public Order() {
    }

    // Constructor με όλα τα πεδία (εκτός orderId αν auto-increment)
    public Order(int orderId, String userId, Timestamp orderDate, String status, List<Book> selectedBooks, double totalPrice) {
        this.orderId = orderId;
        this.userId = userId;
        this.orderDate = orderDate;
        this.status = status;
        this.selectedBooks = selectedBooks;
        this.totalPrice = totalPrice;
    }

    // Constructor χωρίς orderId (για νέα παραγγελία)
    public Order(String userId, Timestamp orderDate, String status, List<Book> selectedBooks, double totalPrice) {
        this.userId = userId;
        this.orderDate = orderDate;
        this.status = status;
        this.selectedBooks = selectedBooks;
        this.totalPrice = totalPrice;
    }

    // Getters και Setters
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Book> getSelectedBooks() {
        return selectedBooks;
    }

    public void setSelectedBooks(List<Book> selectedBooks) {
        this.selectedBooks = selectedBooks;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
