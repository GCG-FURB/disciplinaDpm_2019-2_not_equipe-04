package br.com.commobile.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.commobile.models.Question;
import br.com.commobile.models.Report;
import br.com.commobile.services.QuestionService;
import br.com.commobile.services.ReportService;

@RestController
@RequestMapping("/api/question")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private ReportService reportService;
	
	@GetMapping(value = "/{productId}")
	public Question get(@PathVariable Long productId) throws Exception {
		return this.questionService.find(productId);
	}
	
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public Question create(@RequestBody Question question) throws Exception {
		return this.questionService.create(question);
	}
	
	@PostMapping(value = "/anwser")
	public void anwser(@RequestBody Report report) {
		this.reportService.create(report);
	}
	
	@GetMapping(value = "/{id}/anwser")
	public Object getPlayers(@PathVariable Integer id) {
		return this.reportService.getPalyer(id);
	}
	
	@GetMapping(value = "/anwser/{jogador}")
	public Object getJogador(@PathVariable String jogador) {
		return this.reportService.getJogo(jogador);
	}
}
