package br.com.commobile.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.commobile.models.Product;
import br.com.commobile.services.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Product>> getProducts(@PathVariable Long id) {
		return ResponseEntity.ok().body(this.productService.findByTeacher(id));
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Product> create(@Valid @RequestBody Product product) {
		return ResponseEntity.ok().body(this.productService.create(product));
	}
	
}
