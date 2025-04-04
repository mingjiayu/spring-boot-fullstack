package com.amigoscode;

import com.amigoscode.customer.Customer;
import com.amigoscode.customer.CustomerRepository;
import com.amigoscode.customer.Gender;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner runner(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            Faker faker=new Faker();
            Customer customer= new Customer(
                    faker.name().fullName(),
                    faker.internet().emailAddress(),
                    passwordEncoder.encode(UUID.randomUUID().toString()),
                    faker.number().numberBetween(18, 90),
                    Gender.MALE);
            List<Customer> customerList= new ArrayList<>();
            customerList.add(customer);
            customerRepository.saveAll(customerList);
        };
    }
}
