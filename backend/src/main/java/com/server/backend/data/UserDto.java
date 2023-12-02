package com.server.backend.data;


public class UserDto {
    
    
    private int uid;
    private String fname;
    private String lname;
    private String email;
    private Role role;

    public UserDto() {
    }

    public UserDto(int uid, String fname, String lname, String email, Role role) {
        this.uid = uid;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.role = role;
    }

    public int getUid() {
        return this.uid;
    }

    public String getFname() {
        return this.fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return this.lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    
}
