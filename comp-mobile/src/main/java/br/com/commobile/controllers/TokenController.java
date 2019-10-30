package br.com.commobile.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.commobile.models.Teacher;
import br.com.commobile.services.TokenService;

@RestController
@RequestMapping("/api/login")
public class TokenController {

	@Autowired
	private TokenService tokenService;
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Teacher> login(@RequestBody Teacher teacher) {
		return ResponseEntity.ok().body(this.tokenService.create(teacher));
	}
	
}
