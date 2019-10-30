package br.com.commobile.models;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotNull(message = "Name is required")
	private String name;
	
	@NotNull(message = "Price is required")
	private Double price;
	
	@Column(columnDefinition = "MEDIUMTEXT")
	private String image;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Teacher teacher;
	
}
