package app.java_classes;

public class Location {
    private int locationId; // auto-increment από τη βάση
    private int userId;
    private String city;
    private String address;
    private String prefecture;
    private int postalCode;

    // Default constructor
    public Location() {
    }

    // Constructor για νέα Location (χωρίς locationId)
    public Location(int userId, String city, String address, String prefecture, int postalCode) {
        this.userId = userId;
        this.city = city;
        this.address = address;
        this.prefecture = prefecture;
        this.postalCode = postalCode;
    }

    // Constructor με όλα τα πεδία (για φόρτωση από βάση)
    public Location(int locationId, int userId, String city, String address, String prefecture, int postalCode) {
        this.locationId = locationId;
        this.userId = userId;
        this.city = city;
        this.address = address;
        this.prefecture = prefecture;
        this.postalCode = postalCode;
    }

    // Getters και Setters
    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }
}
