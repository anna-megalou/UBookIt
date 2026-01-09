package app.java_classes;

import java.sql.*;

public class OrderDAO {

    // Μέθοδος για εισαγωγή παραγγελίας
    public void insertOrder(Order order) throws Exception {
        Connection con = null;

        String sql = "INSERT INTO orders "
                   + "(am, identity, name, surname, email, phone, "
                   + "city, prefecture, street, street_id, total_price, order_date) "
                   + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

        DB db = new DB();

        try {
            // Άνοιγμα σύνδεσης
            con = db.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            stmt.setString(1, order.getAM());
            stmt.setString(2, order.getIdentity());
            stmt.setString(3, order.getName());
            stmt.setString(4, order.getSurname());
            stmt.setString(5, order.getEmail());
            stmt.setString(6, order.getPhone());
            stmt.setString(7, order.getCity());
            stmt.setString(8, order.getPrefecture());
            stmt.setString(9, order.getStreet());
            stmt.setString(10, order.getStreetId());
            stmt.setDouble(11, order.getTotalPrice());

            // Εκτέλεση
            stmt.executeUpdate();

            // Παίρνουμε το generated order_id (αν το χρειάζεσαι μετά)
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                order.setOrderId(rs.getInt(1));
            }

            rs.close();
            stmt.close();
            db.close();

        } catch (Exception e) {
            throw new Exception("Error inserting order: " + e.getMessage(), e);
        } finally {
            try {
                db.close();
            } catch (Exception e) {}
        }
    }
}