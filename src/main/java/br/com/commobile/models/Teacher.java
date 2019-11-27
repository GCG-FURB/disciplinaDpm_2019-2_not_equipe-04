package br.com.commobile.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Teacher implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotNull(message = "Name is required")
	@NotEmpty(message = "Name is required")
	private String name;
	
	@NotNull(message = "E-mail is required")
	@NotEmpty(message = "E-mail is required")
	private String email;
	
	@NotNull(message = "Password is required")
	@NotEmpty(message = "Password is required")
	private String password;
	

}
