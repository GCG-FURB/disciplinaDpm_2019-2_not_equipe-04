package br.com.commobile.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.commobile.models.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

}