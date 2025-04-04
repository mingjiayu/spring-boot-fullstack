package com.amigoscode.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

import static java.time.temporal.ChronoUnit.*;

@Service
public class JWTUtil {

    private static final String SECRET_KEY = "foobar_123456789_foobar_123456789_foobar_123456789_foobar_123456789";

    public String issueToken(String subject) {
        return issueToken(subject, Map.of());
    }

    public String issueToken(String subject, String ...scopes) {
        return issueToken(subject, Map.of("scopes", scopes));
    }


    public String issueToken(String subject, Map<String, Object> claims) {
        String token = Jwts
                .builder()
                .claims(claims)          // Instead of setClaims()
                .subject(subject)        // Instead of setSubject()
                .issuer("https://amigoscode.com")  // Instead of setIssuer()
                .issuedAt(Date.from(Instant.now()))  // Instead of setIssuedAt()
                .expiration(              // Instead of setExpiration()
                        Date.from(Instant.now().plus(15, ChronoUnit.DAYS))
                )
                .signWith(getSigningKey())  // Updated signWith method, let JJWT figure out the strongest algorithm
                // possible based on the strength of your supplied key rather than explicitly specifying an algorithm.
                .compact();

        return token;
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }


}
