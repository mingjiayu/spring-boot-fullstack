package com.amigoscode.customer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CustomerRepository extends JpaRepository<Customer, Integer> { //manage our entity in terms of CRUD from database
    // JPA will construct the query for us based on this method here
    // @Query
    boolean existsCustomerByEmail(String email);
    boolean existsCustomerById(Integer id);

    Optional<Customer> findCustomerByEmail(String email);

}
