package br.com.commobile.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.commobile.models.Teacher;
import br.com.commobile.repositories.TeacherRepository;

@Service
public class TeacherService {

	@Autowired
	private TeacherRepository teacherRepository;
	
	public Teacher findById(Long id) {
		Optional<Teacher> option = this.teacherRepository.findById(id);
		return option.isPresent() ? option.get() : null; 
	}
	
	public Teacher findByEmail(String email) {
		return this.teacherRepository.findByEmail(email);
	}
	
	public Teacher create(Teacher teacher) {
		return this.teacherRepository.save(teacher);
	}
}
