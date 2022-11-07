package br.com.projetoIntegrador.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.auth0.jwt.exceptions.SignatureVerificationException;

@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(
		MethodArgumentNotValidException ex, 
		HttpHeaders headers, 
		HttpStatus status, 
		WebRequest request
	) {

		Map<String, String> errors = new HashMap<>();
	    ex.getBindingResult().getAllErrors().forEach((error) -> {
	        String fieldName = ((FieldError) error).getField();
	        String errorMessage = error.getDefaultMessage();
	        errors.put(fieldName, errorMessage);
	    });

	    return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		
	}
	
	@ExceptionHandler({
		NotFoundException.class
	})
	public final ResponseEntity<Object> handleNotFoundException(NotFoundException ex, WebRequest request) throws Exception {
		
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.NOT_FOUND;
		
		return new ResponseEntity<>(ex.getMessage(), headers, status);
		
	}
	
	@ExceptionHandler({
		IllegalArgumentException.class
	})
	public final ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) throws Exception {
		
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.BAD_REQUEST;
		
		return new ResponseEntity<>(ex.getMessage(), headers, status);
		
	}
	
	@ExceptionHandler({
		SignatureVerificationException.class
	})
	public final ResponseEntity<Object> handleSignatureVerificationException(SignatureVerificationException ex, WebRequest request) throws Exception {
		
		HttpHeaders headers = new HttpHeaders();
		HttpStatus status = HttpStatus.I_AM_A_TEAPOT;
		
		return new ResponseEntity<>("O token expirou", headers, status);
		
	}
	
	
	
}
