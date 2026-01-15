package app.java_classes;

public class Student {
    private int studentId;
    private String AM;
    private long identityId;
    private String name;
    private String surname;
    private String email;
    private long phone;
    private String universityId;
    private int userId;

    // Default constructor
    public Student() {
    }

    // Constructor με όλα τα πεδία
    public Student(int studentId, String AM, long identityId, String name, String surname, String email, long phone, String universityId, int userId) {
        this.studentId = studentId;
        this.AM = AM;
        this.identityId = identityId;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.universityId = universityId;
        this.userId = userId;
    }

    // Constructor χωρίς studentId (για νέο φοιτητή)
    public Student(String AM, long identityId, String name, String surname, String email, long phone, String universityId, int userId) {
        this.AM = AM;
        this.identityId = identityId;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.universityId = universityId;
        this.userId = userId;
    }

    // Getters και Setters
    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getAM() {
        return AM;
    }

    public void setAM(String AM) {
        this.AM = AM;
    }

    public long getIdentityId() {
        return identityId;
    }

    public void setIdentityId(long identityId) {
        this.identityId = identityId;
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

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

    public String getUniversityId() {
        return universityId;
    }

    public void setUniversityId(String universityId) {
        this.universityId = universityId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}