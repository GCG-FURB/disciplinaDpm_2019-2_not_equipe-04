package br.com.commobile.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.commobile.models.Teacher;

@Service
public class TokenService {

	@Autowired
	private TeacherService teacherService;

	public Teacher create(Teacher teacher) {
		Teacher teacherFinded = this.teacherService.findByEmail(teacher.getEmail());
		return teacherFinded != null && teacherFinded.getPassword().equals(teacher.getPassword()) ? teacherFinded
				: null;
	}

}
