package dk.kea.valg.repositories;

import dk.kea.valg.models.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    List<Candidate> findCandidatesByAffiliationNameOrAffiliationLetter (String name, Character letter);

}
