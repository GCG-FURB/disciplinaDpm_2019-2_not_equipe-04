package br.com.commobile.services;

import java.util.List;

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
	
	public Product create(Product product) {
		Teacher teacher = this.teacherService.findById(product.getTeacher().getId());
		if (teacher != null) {
			product.setTeacher(teacher);
			return this.productRepository.save(product);
		}
		return null;
	}
	
}
