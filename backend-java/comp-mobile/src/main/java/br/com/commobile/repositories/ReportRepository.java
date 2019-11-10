package br.com.commobile.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.commobile.models.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

	@Query(value = "SELECT player FROM REPORT " + 
			"where question_id = ?1 " + 
			"group by player", nativeQuery = true)
	Object getPlayers(Integer questionId);
	
}
