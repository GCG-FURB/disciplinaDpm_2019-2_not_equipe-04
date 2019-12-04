package br.com.commobile.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.commobile.models.Product;
import br.com.commobile.models.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

	Question findByProduct(Product product);
	
}
