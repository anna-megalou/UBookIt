package app.java_classes;
import java.util.List;

public class Order {
    private int orderId;
    private String AM;
    private String identity;
    private String name;
    private String surname;
    private String email;
    private String phone;
    private String city;
    private String prefecture;
    private String street;
    private String streetId;

    private List<Book> selectedBooks;
    private double totalPrice;

    // Constructor
    public Order(String AM, String identity, String name, String surname, String email, String phone,
                 String city, String prefecture, String street, String streetId,
                 List<Book> selectedBooks, double totalPrice) {
        this.AM = AM;
        this.identity = identity;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.prefecture = prefecture;
        this.street = street;
        this.streetId = streetId;
        this.selectedBooks = selectedBooks;
        this.totalPrice = totalPrice;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    // Getters & Setters
    public String getAM() { 
        return AM; 
    }
    
    public void setAM(String AM) { 
        this.AM = AM; 
    }

    public String getIdentity() { 
        return identity; 
    }

    public void setIdentity(String identity) { 
        this.identity = identity; 
    }

    public String getName() { 
        return name; 
    }

    public void setName(String name) { 
        this.name = name; 
    }

    public String getSurname() { 
        return surname; 
    }

    public void setSurname(String surname) { 
        this.surname = surname; 
    }

    public String getEmail() { 
        return email; 
    }

    public void setEmail(String email) { 
        this.email = email; 
    }

    public String getPhone() { 
        return phone; 
    }

    public void setPhone(String phone) { 
        this.phone = phone; 
    }

    public String getCity() { 
        return city; 
    }

    public void setCity(String city) { 
        this.city = city; 
    }

    public String getPrefecture() { 
        return prefecture; 
    }

    public void setPrefecture(String prefecture) { 
        this.prefecture = prefecture; 
    }

    public String getStreet() { 
        return street; 
    }

    public void setStreet(String street) { 
        this.street = street; 
    }

    public String getStreetId() { 
        return streetId; 
    }

    public void setStreetId(String streetId) { 
        this.streetId = streetId; 
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
