package br.com.projetoIntegrador.config;

import java.time.LocalDate;
import java.util.Map;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;

public class JWTConfig {

	private static final String SECRET = LocalDate.now().toString();

	public static String createToken(Map<String, Object> headerClaims) {		
		
		try {
		    Algorithm algorithm = Algorithm.HMAC256(SECRET);
		    String token = JWT.create()
		        .withIssuer("auth0")
		        .withHeader(headerClaims)
		        .sign(algorithm);
		    
		    return token;
		} catch (JWTCreationException exception){
		    exception.printStackTrace();
		}
		
		return null;
		
	}

	public static DecodedJWT decode(String token) {
		
		if(token==null){
			return null;
		}
		
		Algorithm algorithm = Algorithm.HMAC256(SECRET);
		
	    JWTVerifier verifier = JWT.require(algorithm)
	        .withIssuer("auth0")
	        .build(); //Reusable verifier instance
	    
	    return verifier.verify(token);
	}
	
}