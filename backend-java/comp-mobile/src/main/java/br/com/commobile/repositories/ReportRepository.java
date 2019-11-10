package br.com.commobile.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.commobile.models.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

	@Query(value = "SELECT player FROM REPORT " + 
			"where question_id = ?1 " + 
			"group by player", nativeQuery = true)
	List<Object> getPlayers(Integer questionId);
	
	@Query(value = "SELECT count(asserts) FROM REPORT" + 
			"where  player = ?1 " + 
			"group by asserts", nativeQuery = true)
	List<Object> getReport(String player);
}
