package br.com.projetoIntegrador.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoIntegrador.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	Optional<User> findByUsername(String username);
	
	boolean existsByUsername(String username);
	
	public List<User> findAllByOrderByName();

}
