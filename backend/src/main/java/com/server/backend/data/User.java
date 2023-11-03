package com.server.backend.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class User {
    
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int uid;

private String fname;
private String lname;
private String email;
private String password;

public User() {

}

public User(int uid, String fname, String lname, String email, String password) {
    this.uid = uid;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
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

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



}
