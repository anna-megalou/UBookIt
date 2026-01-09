package app.java_classes;

import java.sql.*;

public class OrderDAO {

    // Μέθοδος για εισαγωγή παραγγελίας
    public void insertOrder(Order order) throws Exception {
        Connection con = null;

        // Δεν βάζουμε το order_id στο INSERT, γιατί είναι auto-increment
        String sql = "INSERT INTO orders (USER_ID, ORDER_DATE, STATUS, TOTAL_PRICE) "
                   + "VALUES (?, ?, ?, ?)";

        DB db = new DB();

        try {
            con = db.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            stmt.setString(1, order.getUserId());
            stmt.setTimestamp(2, order.getOrderDate());
            stmt.setString(3, order.getStatus());
            stmt.setDouble(4, order.getTotalPrice());

            stmt.executeUpdate();

            // Παίρνουμε το auto-generated order_id
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
            } catch (Exception e) {
                // ignore
            }
        }
    }
}
