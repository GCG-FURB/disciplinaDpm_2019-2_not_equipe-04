package br.com.commobile.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.commobile.models.Token;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

}
