package app.java_classes;

import java.sql.*;

public class PaymentDAO {

    // Μέθοδος για εισαγωγή πληρωμής
    public void insertPayment(Payment payment) throws Exception {
        Connection con = null;

        // SQL statement με paymentDate = CURRENT_TIMESTAMP
        String sql = "INSERT INTO payments "
                   + "(user_id, declaration_id, shipping_method, payment_method, "
                   + "card_last4, card_holder_name, extra_fee, total_amount, payment_date) "
                   + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

        DB db = new DB();

        try {
            // Ανοίγουμε σύνδεση
            con = db.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setInt(1, payment.getUserId());
            stmt.setInt(2, payment.getDeclarationId());
            stmt.setString(3, payment.getShippingMethod());
            stmt.setString(4, payment.getPaymentMethod());

            // Αν είναι πληρωμή με κάρτα, βάζουμε τα στοιχεία, αλλιώς null
            if ("card".equalsIgnoreCase(payment.getPaymentMethod())) {
                stmt.setString(5, payment.getCardLast4());
                stmt.setString(6, payment.getCardHolderName());
            } else {
                stmt.setString(5, null);
                stmt.setString(6, null);
            }

            stmt.setDouble(7, payment.getExtraFee());
            stmt.setDouble(8, payment.getTotalAmount());

            // Εκτέλεση
            stmt.executeUpdate();

            stmt.close();
            db.close();
        } catch (Exception e) {
            throw new Exception("Error inserting payment: " + e.getMessage(), e);
        } finally {
            try {
                db.close(); 
            } catch (Exception e) {}
        }
    }
}

