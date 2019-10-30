package br.com.commobile.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.commobile.models.Teacher;
import br.com.commobile.services.TeacherService;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
	
	@Autowired
	private TeacherService teacherService;

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Teacher> create(@Valid @RequestBody Teacher teacher) {
		return ResponseEntity.ok().body(this.teacherService.create(teacher));
	}
	
}
