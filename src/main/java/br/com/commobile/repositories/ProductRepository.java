package br.com.commobile.repositories;

import java.util.List;

import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Producer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.commobile.models.Product;
import br.com.commobile.models.Teacher;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findByTeacher(Teacher teacher);
	
}
