package br.com.commobile.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.commobile.models.Product;
import br.com.commobile.models.Teacher;
import br.com.commobile.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private TeacherService teacherService;
	
	public List<Product> findByTeacher(Long teacherId) {
		Teacher teacher = this.teacherService.findById(teacherId);
		return this.productRepository.findByTeacher(teacher);
	}
	
	public Product findById(Long id) throws Exception {
		Optional<Product> optional = this.productRepository.findById(id);
		if (!optional.isPresent()) {
			throw new Exception();
		}
		return optional.get();
	}
	
	public Product create(Product product) {
		Teacher teacher = this.teacherService.findById(product.getTeacher().getId());
		if (teacher != null) {
			product.setTeacher(teacher);
			return this.productRepository.save(product);
		}
		return null;
	}
	
	public Product update(Long productId, Product product) throws Exception {
		Product productFinded = this.findById(productId);
		if (product.getImage() != null) {
			productFinded.setImage(product.getImage());
		}
		if (product.getName() != null) {
			productFinded.setName(product.getName());
		}
		if (product.getPrice() != null) {
			productFinded.setPrice(product.getPrice());
		}
		return this.productRepository.save(productFinded);
	}
	
}
