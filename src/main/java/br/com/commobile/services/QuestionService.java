package br.com.commobile.services;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.commobile.models.Product;
import br.com.commobile.models.Question;
import br.com.commobile.repositories.QuestionRepository;

@Service
public class QuestionService {
	
	@Autowired
	private QuestionRepository questionRepository;
	
	@Autowired
	private ProductService productService;

	public Question find(Integer id) {
		Optional<Question> questio = this.questionRepository.findById(id);
		if (questio.isPresent()) {
			return questio.get();
		}
		return null;
	}
	
	public Question find(Long id) throws Exception {
		Product product = this.productService.findById(id);
		return this.find(product);
	}
	
	public Question find(Product product) {
		 return this.questionRepository.findByProduct(product);
	}
	
	@Transactional
	public Question create(Question question) throws Exception {
		question.setProduct(this.productService.findById(question.getProduct().getId()));
		Question q = this.find(question.getProduct());
		if (q != null) {
			this.questionRepository.delete(q);
		}
		return this.questionRepository.save(question);
	}
	
}
