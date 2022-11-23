package dk.kea.valg.controllers;

import dk.kea.valg.models.Party;
import dk.kea.valg.repositories.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Parties {

    @Autowired
    PartyRepository parties;

    @GetMapping("/parties")
    public Iterable<Party> getParties() {
        return parties.findAll();
    }
}
