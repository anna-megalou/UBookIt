package app.java_classes;

import java.sql.Timestamp;
import java.util.List;

public class Order {
    private int orderId;
    private int userId;
    private Timestamp orderDate;
    private List<OrderItems> items;
    private double totalPrice;

    // Default constructor
    public Order() {
    }

    // Constructor με όλα τα πεδία (εκτός orderId αν auto-increment)
    public Order(int orderId, int userId, Timestamp orderDate, List<OrderItems> items, double totalPrice) {
        this.orderId = orderId;
        this.userId = userId;
        this.orderDate = orderDate;
        this.items = items;
        this.totalPrice = totalPrice;
    }

    // Constructor χωρίς orderId (για νέα παραγγελία)
    public Order(int userId, Timestamp orderDate, List<OrderItems> items, double totalPrice) {
        this.userId = userId;
        this.orderDate = orderDate;
        this.items = items;
        this.totalPrice = totalPrice;
    }

    // Getters και Setters
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public List<OrderItems> getItems() {
        return items;
    }

    public void setItems(List<OrderItems> items) {
        this.items = items;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
