package app.java_classes;

import java.sql.*;

public class StudentDAO {

    // Μέθοδος για εισαγωγή Φοιτητή (auto-increment student_id)
    public void insertStudent(Student student) throws Exception {
        Connection con = null;

        // Το STUDENT_ID είναι auto-increment στη βάση, οπότε δεν το βάζουμε στο INSERT
        String sql = "INSERT INTO students (am, identity_id, name, surname, email, phone, university_id, user_id) "
                   + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        DB db = new DB();

        try {
            con = db.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            stmt.setString(1, student.getAM());
            // Εδώ χρησιμοποιούμε String για το 12-ψήφιο Academic ID (IdentityId)
            stmt.setLong(2, student.getIdentityId()); 
            stmt.setString(3, student.getName());
            stmt.setString(4, student.getSurname());
            stmt.setString(5, student.getEmail());
            stmt.setLong(6, student.getPhone());
            stmt.setString(7, student.getUniversityId());
            stmt.setInt(8, student.getUserId());

            stmt.executeUpdate();

            // Παίρνουμε το auto-generated student_id που δημιούργησε η βάση
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                student.setStudentId(rs.getInt(1));
            }

            rs.close();
            stmt.close();

        } catch (Exception e) {
            throw new Exception("Error inserting student: " + e.getMessage(), e);
        } finally {
            try {
                db.close();
            } catch (Exception e) {
                // ignore
            }
        }
    }
}