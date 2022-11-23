package dk.kea.valg.repositories;

import dk.kea.valg.models.Municipality;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MunicipalityRepository extends JpaRepository<Municipality, Long> {
}
