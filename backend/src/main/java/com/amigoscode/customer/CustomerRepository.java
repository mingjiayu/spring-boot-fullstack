package com.amigoscode.customer;

import org.springframework.data.jpa.repository.JpaRepository;


public interface CustomerRepository extends JpaRepository<Customer, Integer> { //manage our entity in terms of CRUD from database
    // JPA will construct the query for us based on this method here
    // @Query
    boolean existsCustomerByEmail(String email);
    boolean existsCustomerById(Integer id);

}
