package br.com.commobile.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.commobile.models.Question;
import br.com.commobile.models.Report;
import br.com.commobile.repositories.ReportRepository;

@Service
public class ReportService {

	@Autowired
	private ReportRepository reportRepository;
	
	@Autowired
	private QuestionService questionService;
	
	public Report create(Report entity) {
		Question question = this.questionService.find(entity.getQuestion().getId());
		entity.setQuestion(question);
		return this.reportRepository.save(entity);
	}
	
	public Object getPalyer(Integer questionId) {
		return this.reportRepository.getPlayers(questionId);
	}
	
	public Object getJogo(String jogador) {
		return this.reportRepository.getReport(jogador);
	}
	
}
