package app.java_classes;

import java.sql.*;

public class LocationDAO {

    // Μέθοδος για εισαγωγή Location (auto-increment location_id)
    public void insertLocation(Location location) throws Exception {
        Connection con = null;

        // Δεν περιλαμβάνουμε το location_id στο INSERT
        String sql = "INSERT INTO location (USER_ID, CITY, ADDRESS, PREFECTURE, POSTAL_CODE) "
                   + "VALUES (?, ?, ?, ?, ?)";

        DB db = new DB();

        try {
            con = db.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            stmt.setInt(1, location.getUserId());
            stmt.setString(2, location.getCity());
            stmt.setString(3, location.getAddress());
            stmt.setString(4, location.getPrefecture());
            stmt.setInt(5, location.getPostalCode());

            stmt.executeUpdate();

            // Παίρνουμε το auto-generated location_id
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                location.setLocationId(rs.getInt(1));
            }

            rs.close();
            stmt.close();
            db.close();

        } catch (Exception e) {
            throw new Exception("Error inserting location: " + e.getMessage(), e);
        } finally {
            try {
                db.close();
            } catch (Exception e) {
                // ignore
            }
        }
    }
}
