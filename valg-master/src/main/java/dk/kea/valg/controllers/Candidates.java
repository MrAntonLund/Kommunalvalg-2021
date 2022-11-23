package dk.kea.valg.controllers;

import dk.kea.valg.models.Candidate;
import dk.kea.valg.repositories.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Candidates {

    @Autowired
    CandidateRepository candidates;

    // Find all
    @GetMapping("/candidates")
    public Iterable<Candidate> getCandidates() {
        return candidates.findAll();
    }

    // Find one by ID
    @GetMapping("/candidates/{id}")
    public Candidate getCandidate(@PathVariable Long id) {
        return candidates.findById(id).get();
    }

    // Find all by PARTY NAME or PARTY LETTER
    @GetMapping("/candidates/search")
    public List<Candidate> getCandidatesByAffiliationNameOrAffiliationLetter
    (@RequestParam(required = false)String name,@RequestParam(required = false) Character letter)
    {return candidates.findCandidatesByAffiliationNameOrAffiliationLetter(name, letter);}

    // Create (POST)
    @PostMapping("/candidates")
    public Candidate addCandidate(@RequestBody Candidate newCandidate) {
        newCandidate.setId(null); // don't allow the client to overwrite the id
        return candidates.save(newCandidate);
    }

    // PUT
    @PutMapping("/candidates/{id}")
    public String updateCandidateById(@PathVariable Long id, @RequestBody Candidate candidatesToUpdateWith) {
        if (candidates.existsById(id)) {
            candidatesToUpdateWith.setId(id);
            candidates.save(candidatesToUpdateWith);
            return "Candidate was created";
        } else {
            return "Candidate not found";
        }
    }

    // PATCH
    @PatchMapping("/candidates/{id}")
    public String patchArtistById(@PathVariable Long id, @RequestBody Candidate candidateToUpdateWith) {
        return candidates.findById(id).map(foundCandidate -> {
            if (candidateToUpdateWith.getName() != null) foundCandidate.setName(candidateToUpdateWith.getName());
            if (candidateToUpdateWith.getVotes() != -1) foundCandidate.setVotes(candidateToUpdateWith.getVotes());
            candidates.save(foundCandidate);
            return "Candidate updated";
        }).orElse("Candidate not found");
    }

    // DELETE
    @DeleteMapping("/candidates/{id}")
    public String deleteArtistById(@PathVariable Long id) {
        if (candidates.existsById(id)){
            candidates.deleteById(id);
            return "Candidate deleted";
        } else {
            return "No candidate found";
        }
    }
}
