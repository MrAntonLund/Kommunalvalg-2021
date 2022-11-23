package dk.kea.valg.repositories;

import dk.kea.valg.models.Party;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyRepository extends JpaRepository<Party, Long> {
}
